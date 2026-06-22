import { In } from "typeorm";
import { InvoiceEntity, OrderEntity } from "../../db/entities";
import { parsePageParams } from "../../shared/pagination";
import { applyColumnDefaults } from "../../shared/entity-defaults";
import { badRequest, notFound, HttpError } from "../../shared/http-error";
import { computeInvoiceTotals, summarisePaidAmount, deriveInvoiceStatus } from "./invoice-compute";
async function buildInvoiceWithComputedTotals(db, userId, payload) {
    const orderRepo = db.getRepository(OrderEntity);
    const orderIds = Array.isArray(payload.orderIds) ? payload.orderIds : [];
    const orders = orderIds.length ? await orderRepo.find({ where: { id: In(orderIds), userId } }) : [];
    if (orders.length !== orderIds.length) {
        throw badRequest("One or more orderIds not found");
    }
    const totals = computeInvoiceTotals({
        orders,
        gstRate: payload.gstRate,
        gstType: payload.gstType,
        tdsAmount: payload.tdsAmount || 0,
        discountAmount: payload.discountAmount || 0,
        tcsRate: payload.tcsRate || 0,
        roundOff: payload.roundOff || 0,
    });
    const paidAmount = summarisePaidAmount(payload.payments || []);
    const status = deriveInvoiceStatus(totals, paidAmount, payload.dueDate, payload.status);
    return { totals, paidAmount, status, orders };
}
export async function listInvoices(req, res) {
    try {
        const { limit, offset } = parsePageParams(req.query);
        const [data, total] = await req.db.getRepository(InvoiceEntity).findAndCount({
            where: { userId: req.user.id },
            take: limit,
            skip: offset,
        });
        res.json({ data, total, limit, offset });
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to load invoices. Please try again.");
    }
}
export async function createInvoice(req, res) {
    try {
        const userId = req.user.id;
        const invRepo = req.db.getRepository(InvoiceEntity);
        const payload = { ...req.body };
        delete payload.id;
        delete payload.user;
        payload.userId = userId;
        const { totals, paidAmount, status } = await buildInvoiceWithComputedTotals(req.db, userId, payload);
        Object.assign(payload, totals, { paidAmount, status });
        applyColumnDefaults(invRepo, payload);
        res.status(201).json(await invRepo.save(payload));
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to create invoice. Please try again.");
    }
}
export async function updateInvoice(req, res) {
    try {
        const userId = req.user.id;
        const invRepo = req.db.getRepository(InvoiceEntity);
        const existing = await invRepo.findOne({ where: { id: String(req.params.id), userId } });
        if (!existing)
            throw notFound("Invoice not found");
        const body = { ...req.body };
        delete body.id;
        delete body.userId;
        delete body.user;
        const merged = invRepo.merge(existing, body);
        const { totals, paidAmount, status } = await buildInvoiceWithComputedTotals(req.db, userId, merged);
        Object.assign(merged, totals, { paidAmount, status });
        applyColumnDefaults(invRepo, merged);
        res.json(await invRepo.save(merged));
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to update invoice. Please try again.");
    }
}
export async function deleteInvoice(req, res) {
    try {
        const invRepo = req.db.getRepository(InvoiceEntity);
        const existing = await invRepo.findOne({ where: { id: String(req.params.id), userId: req.user.id } });
        if (!existing)
            throw notFound("Invoice not found");
        await invRepo.remove(existing);
        res.json({ success: true });
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to delete invoice. Please try again.");
    }
}
