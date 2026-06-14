import { Request, Response } from "express";
import {
  PlantAdvancePoolEntryEntity, PaymentRecordEntity, ExpenseEntity, BankEntity, SiteEntity,
} from "../../db/entities";
import { applyColumnDefaults } from "../../shared/entity-defaults";
import { HttpError } from "../../shared/http-error";

export async function listPoolEntries(req: Request, res: Response): Promise<void> {
  try {
    res.json(await req.db!.getRepository(PlantAdvancePoolEntryEntity).find({ where: { userId: req.user!.id } }));
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(500, "Failed to load plant advance pool. Please try again.");
  }
}

export async function createPoolEntry(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.id;
    const poolRepo = req.db!.getRepository(PlantAdvancePoolEntryEntity);
    const payRepo = req.db!.getRepository(PaymentRecordEntity);
    const expRepo = req.db!.getRepository(ExpenseEntity);
    const bRepo = req.db!.getRepository(BankEntity);
    const sRepo = req.db!.getRepository(SiteEntity);

    const entry = { ...req.body } as any;
    delete entry.id;
    delete entry.user;
    entry.userId = userId;
    applyColumnDefaults(poolRepo, entry);
    const savedPool = await poolRepo.save(entry);

    const bank = entry.bankId ? await bRepo.findOne({ where: { id: entry.bankId, userId } }) : null;
    const station = entry.stationId ? await sRepo.findOne({ where: { id: entry.stationId, userId } }) : null;
    const stationName = station?.name || "Power Station";

    await payRepo.save({
      userId,
      type: entry.transactionType === "PAID" ? "PAY" : "RECEIVE",
      partyName: stationName,
      method: entry.paymentMethod,
      amount: entry.amount,
      date: entry.date,
      bankId: entry.bankId,
      bankName: bank?.bankName || "Self",
      transactionId: entry.referenceNo,
      description: `[POOL: ${savedPool.id}] Lifetime Advance ${entry.transactionType === "PAID" ? "Paid" : "Received"} for ${stationName}.`,
      poolId: savedPool.id,
    });

    if (entry.transactionType === "PAID") {
      await expRepo.save({
        userId,
        category: "PLANT_ADVANCE",
        date: entry.date,
        amount: entry.amount,
        paymentMode: entry.paymentMethod === "CASH" ? "CASH" : entry.paymentMethod === "UPI" ? "UPI" : "BANK",
        referenceNo: entry.referenceNo,
        vendorName: stationName,
        description: `[POOL: ${savedPool.id}] Lifetime Advance Deposit to TPS: ${stationName}.`,
        status: "APPROVED",
        paymentStatus: "PAID",
        paidDate: entry.date,
        responsibleStaff: entry.employeeName || "System Admin",
        isAuto: true,
        poolId: savedPool.id,
        history: [{
          action: "PLANT_ADV_POOL_ADD",
          user: "System Admin",
          timestamp: new Date().toISOString().split("T")[0],
          note: `Auto-posted from Plant Hub [${savedPool.id}]`,
        }],
      });
    }

    res.status(201).json(savedPool);
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(500, "Failed to create pool entry. Please try again.");
  }
}
