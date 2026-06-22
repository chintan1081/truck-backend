import { OrderEntity, TruckEntity, DriverEntity } from "../../db/entities";
import { parsePageParams } from "../../shared/pagination";
import { applyColumnDefaults } from "../../shared/entity-defaults";
import { badRequest, conflict, notFound, HttpError } from "../../shared/http-error";
import { assertTransition } from "../../shared/order-status";
export async function listOrders(req, res) {
    try {
        const userId = req.user.id;
        const { limit, offset } = parsePageParams(req.query);
        const [data, total] = await req.db.getRepository(OrderEntity).findAndCount({
            where: { userId },
            take: limit,
            skip: offset,
        });
        res.json({ data, total, limit, offset });
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to load orders. Please try again.");
    }
}
export async function createOrder(req, res) {
    try {
        const userId = req.user.id;
        const oRepo = req.db.getRepository(OrderEntity);
        const tRepo = req.db.getRepository(TruckEntity);
        const dRepo = req.db.getRepository(DriverEntity);
        const oData = { ...req.body };
        delete oData.id;
        delete oData.user;
        oData.userId = userId;
        if (oData.status !== "CREATED" && oData.status !== "ASSIGNED") {
            throw badRequest("New orders must start in CREATED or ASSIGNED status");
        }
        if (oData.status === "ASSIGNED" && !oData.assignedTruckId) {
            throw badRequest("ASSIGNED orders require assignedTruckId");
        }
        if (oData.assignedTruckId) {
            const truck = await tRepo.findOne({ where: { id: oData.assignedTruckId, userId } });
            if (!truck)
                throw badRequest("assignedTruckId does not match any truck");
            if (truck.status === "ON_TRIP")
                throw conflict("Truck already on a trip");
            oData.driverName = truck.driverName;
            oData.assignedTruckNumber = truck.truckNumber;
            const driver = await dRepo.findOne({ where: { name: truck.driverName, userId } });
            if (driver)
                oData.driverPhone = driver.phoneNumber;
            truck.status = "ON_TRIP";
            await tRepo.save(truck);
            if (oData.status === "CREATED")
                oData.status = "ASSIGNED";
        }
        applyColumnDefaults(oRepo, oData);
        res.status(201).json(await oRepo.save(oData));
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to create order. Please try again.");
    }
}
export async function updateOrder(req, res) {
    try {
        const userId = req.user.id;
        const oRepo = req.db.getRepository(OrderEntity);
        const tRepo = req.db.getRepository(TruckEntity);
        const dRepo = req.db.getRepository(DriverEntity);
        const id = String(req.params.id);
        const oData = { ...req.body };
        delete oData.id;
        delete oData.userId;
        delete oData.user;
        const originalOrder = await oRepo.findOne({ where: { id, userId } });
        if (!originalOrder)
            throw notFound("Order not found");
        if (oData.status && oData.status !== originalOrder.status) {
            assertTransition(originalOrder.status, oData.status);
        }
        if ("assignedTruckId" in oData && originalOrder.assignedTruckId && originalOrder.assignedTruckId !== oData.assignedTruckId) {
            const oldTruck = await tRepo.findOne({ where: { id: originalOrder.assignedTruckId, userId } });
            if (oldTruck) {
                oldTruck.status = "AVAILABLE";
                await tRepo.save(oldTruck);
            }
        }
        if (oData.assignedTruckId && oData.assignedTruckId !== originalOrder.assignedTruckId) {
            const truck = await tRepo.findOne({ where: { id: oData.assignedTruckId, userId } });
            if (!truck)
                throw badRequest("assignedTruckId does not match any truck");
            if (truck.status === "ON_TRIP")
                throw conflict("Truck already on a trip");
            oData.driverName = truck.driverName;
            oData.assignedTruckNumber = truck.truckNumber;
            const driver = await dRepo.findOne({ where: { name: truck.driverName, userId } });
            if (driver)
                oData.driverPhone = driver.phoneNumber;
            truck.status = "ON_TRIP";
            await tRepo.save(truck);
        }
        // Once the trip is delivered (or further along), the truck is free for the
        // next dispatch — without this it stays ON_TRIP forever.
        const finalStatus = (oData.status ?? originalOrder.status);
        const finalTruckId = "assignedTruckId" in oData ? oData.assignedTruckId : originalOrder.assignedTruckId;
        if (finalTruckId && ["DELIVERED", "INVOICED", "PAID"].includes(finalStatus)) {
            const truck = await tRepo.findOne({ where: { id: finalTruckId, userId } });
            if (truck && truck.status === "ON_TRIP") {
                truck.status = "AVAILABLE";
                await tRepo.save(truck);
            }
        }
        oRepo.merge(originalOrder, oData);
        res.json(await oRepo.save(originalOrder));
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to update order. Please try again.");
    }
}
export async function deleteOrder(req, res) {
    try {
        const userId = req.user.id;
        const oRepo = req.db.getRepository(OrderEntity);
        const tRepo = req.db.getRepository(TruckEntity);
        const order = await oRepo.findOne({ where: { id: String(req.params.id), userId } });
        if (!order)
            throw notFound("Order not found");
        if (order.assignedTruckId) {
            const truck = await tRepo.findOne({ where: { id: order.assignedTruckId, userId } });
            if (truck) {
                truck.status = "AVAILABLE";
                await tRepo.save(truck);
            }
        }
        await oRepo.remove(order);
        res.json({ success: true });
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to delete order. Please try again.");
    }
}
