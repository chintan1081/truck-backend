import { getDataSource } from "../../db/data-source";
import { DriverEntity, OrderEntity, TruckEntity } from "../../db/entities";
import { DriverSalaryEntity } from "../../db/entities/hr.entities";
import { hashPassword, verifyPassword } from "../../shared/password";
import { signJwt } from "../../shared/jwt";
import { badRequest, conflict, notFound } from "../../shared/http-error";

export interface DriverAuthResult {
  token: string;
  driver: { id: string; name: string; phoneNumber: string };
}

function digitsOnly(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export async function loginDriver(input: { phoneNumber?: unknown; password?: unknown }): Promise<DriverAuthResult> {
  const { phoneNumber, password } = input;
  if (typeof phoneNumber !== "string" || typeof password !== "string" || !phoneNumber.trim() || !password) {
    throw badRequest("Phone number and password required");
  }

  const db = await getDataSource();
  const repo = db.getRepository(DriverEntity);

  let driver = await repo.findOne({
    where: { phoneNumber: phoneNumber.trim() },
    select: { id: true, userId: true, name: true, phoneNumber: true, passwordHash: true, passwordSalt: true, portalAccessEnabled: true },
  });

  if (!driver) {
    // Fall back to a digit-only suffix match in case the stored value has
    // spaces/dashes/a country code that the typed input doesn't.
    const inputDigits = digitsOnly(phoneNumber);
    const candidates = await repo.find({
      select: { id: true, userId: true, name: true, phoneNumber: true, passwordHash: true, passwordSalt: true, portalAccessEnabled: true },
    });
    driver = candidates.find(d => digitsOnly(d.phoneNumber).endsWith(inputDigits) || inputDigits.endsWith(digitsOnly(d.phoneNumber))) ?? null;
  }

  if (!driver || !driver.portalAccessEnabled || !driver.passwordHash || !driver.passwordSalt) {
    throw badRequest("Incorrect phone number or password. Please try again.");
  }
  if (!verifyPassword(password, driver.passwordHash, driver.passwordSalt)) {
    throw badRequest("Incorrect phone number or password. Please try again.");
  }

  const token = signJwt({ sub: driver.id, type: "DRIVER", ownerId: driver.userId, phoneNumber: driver.phoneNumber, name: driver.name });
  return { token, driver: { id: driver.id, name: driver.name, phoneNumber: driver.phoneNumber } };
}

export async function setDriverPortalPassword(driverId: string, ownerId: string, password: unknown): Promise<void> {
  if (typeof password !== "string" || password.length < 4) {
    throw badRequest("Password must be at least 4 characters");
  }
  const db = await getDataSource();
  const repo = db.getRepository(DriverEntity);
  const driver = await repo.findOne({ where: { id: driverId, userId: ownerId } });
  if (!driver) throw notFound("Driver not found");

  const { hash, salt } = hashPassword(password);
  driver.passwordHash = hash;
  driver.passwordSalt = salt;
  driver.portalAccessEnabled = true;
  await repo.save(driver);
}

export async function getMyOrders(ownerId: string, phoneNumber: string): Promise<OrderEntity[]> {
  const db = await getDataSource();
  return db.getRepository(OrderEntity).find({
    where: { userId: ownerId, driverPhone: phoneNumber },
    order: { pickupDate: "DESC" },
  });
}

export async function acceptOrder(orderId: string, ownerId: string, phoneNumber: string): Promise<OrderEntity> {
  const db = await getDataSource();
  const repo = db.getRepository(OrderEntity);
  const order = await repo.findOne({ where: { id: orderId, userId: ownerId, driverPhone: phoneNumber } });
  if (!order) throw notFound("Order not found");
  if (order.status !== "ASSIGNED") throw conflict("Only newly assigned orders can be accepted");

  order.driverAcceptanceStatus = "ACCEPTED";
  return repo.save(order);
}

export async function pickupOrder(orderId: string, ownerId: string, phoneNumber: string, challanNumber?: string): Promise<OrderEntity> {
  const db = await getDataSource();
  const repo = db.getRepository(OrderEntity);
  const order = await repo.findOne({ where: { id: orderId, userId: ownerId, driverPhone: phoneNumber } });
  if (!order) throw notFound("Order not found");
  if (order.status !== "ASSIGNED") throw conflict("Order must be ASSIGNED and accepted before pickup");
  if (order.driverAcceptanceStatus !== "ACCEPTED") throw conflict("You must accept the order before marking pickup");

  order.status = "PICKED";
  if (challanNumber) (order as any).challanNumber = challanNumber;
  return repo.save(order);
}

export async function deliverOrder(orderId: string, ownerId: string, phoneNumber: string): Promise<OrderEntity> {
  const db = await getDataSource();
  const oRepo = db.getRepository(OrderEntity);
  const tRepo = db.getRepository(TruckEntity);

  const order = await oRepo.findOne({ where: { id: orderId, userId: ownerId, driverPhone: phoneNumber } });
  if (!order) throw notFound("Order not found");
  if (order.status !== "PICKED") throw conflict("Order must be in PICKED state to deliver");

  order.status = "DELIVERED";
  if (order.assignedTruckId) {
    const truck = await tRepo.findOne({ where: { id: order.assignedTruckId, userId: ownerId } });
    if (truck) {
      truck.status = "AVAILABLE";
      await tRepo.save(truck);
    }
  }
  return oRepo.save(order);
}

export async function getMyTruck(ownerId: string, phoneNumber: string): Promise<TruckEntity | null> {
  const db = await getDataSource();
  // Find an active order to get the truck id
  const order = await db.getRepository(OrderEntity).findOne({
    where: [
      { userId: ownerId, driverPhone: phoneNumber, status: "ASSIGNED" },
      { userId: ownerId, driverPhone: phoneNumber, status: "PICKED" },
    ],
    order: { pickupDate: "DESC" },
  });
  if (!order?.assignedTruckId) return null;
  return db.getRepository(TruckEntity).findOne({ where: { id: order.assignedTruckId, userId: ownerId } });
}

export async function getMyEarnings(ownerId: string, phoneNumber: string): Promise<{ salaries: DriverSalaryEntity[]; deliveredCount: number }> {
  const db = await getDataSource();
  const driver = await db.getRepository(DriverEntity).findOne({ where: { phoneNumber, userId: ownerId } });
  const salaries = driver
    ? await db.getRepository(DriverSalaryEntity).find({
        where: { driverId: driver.id, userId: ownerId },
        order: { month: "DESC" },
        take: 10,
      })
    : [];
  const deliveredCount = await db.getRepository(OrderEntity).count({
    where: [
      { userId: ownerId, driverPhone: phoneNumber, status: "DELIVERED" },
      { userId: ownerId, driverPhone: phoneNumber, status: "INVOICED" },
      { userId: ownerId, driverPhone: phoneNumber, status: "PAID" },
    ],
  });
  return { salaries, deliveredCount };
}

export async function rejectOrder(orderId: string, ownerId: string, phoneNumber: string): Promise<void> {
  const db = await getDataSource();
  const oRepo = db.getRepository(OrderEntity);
  const tRepo = db.getRepository(TruckEntity);

  const order = await oRepo.findOne({ where: { id: orderId, userId: ownerId, driverPhone: phoneNumber } });
  if (!order) throw notFound("Order not found");
  if (order.status !== "ASSIGNED") throw conflict("Only newly assigned orders can be rejected");

  if (order.assignedTruckId) {
    const truck = await tRepo.findOne({ where: { id: order.assignedTruckId, userId: ownerId } });
    if (truck) {
      truck.status = "AVAILABLE";
      await tRepo.save(truck);
    }
  }

  // Use `null` (not `undefined`) so TypeORM actually clears these columns —
  // `undefined` properties are skipped entirely by the update, not nulled.
  oRepo.merge(order, {
    status: "CREATED",
    assignedTruckId: null,
    assignedTruckNumber: null,
    driverName: null,
    driverPhone: null,
    driverAcceptanceStatus: null,
  } as any);
  await oRepo.save(order);
}
