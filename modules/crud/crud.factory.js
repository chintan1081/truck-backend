import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { notFound } from "../../shared/http-error";
import { parsePageParams } from "../../shared/pagination";
import { applyColumnDefaults } from "../../shared/entity-defaults";
import { validate } from "../../middleware/validate.middleware";
/**
 * Builds a standard list/create/update/delete router for a user-owned entity.
 *
 * Every query is scoped to the authenticated user (`req.user.id`):
 *   - list   → only the user's rows
 *   - create → `userId` is stamped server-side; the DB generates the uuid `id`
 *   - update/delete → row must belong to the user, otherwise 404
 *
 * Assumes `req.db` (attachDb) and `req.user` (requireAuth) are populated.
 */
export function buildCrudRouter(entity, resourceName, opts = {}) {
    const router = Router({ mergeParams: true });
    const writeMw = opts.writeSchema ? [validate(opts.writeSchema)] : [];
    router.get("/", asyncHandler(async (req, res) => {
        const repo = req.db.getRepository(entity);
        const { limit, offset } = parsePageParams(req.query);
        const [data, total] = await repo.findAndCount({
            where: { userId: req.user.id },
            take: limit,
            skip: offset,
        });
        res.json({ data, total, limit, offset });
    }));
    router.post("/", ...writeMw, asyncHandler(async (req, res) => {
        const repo = req.db.getRepository(entity);
        const data = { ...req.body };
        // The DB owns id generation; ownership is set server-side.
        delete data.id;
        delete data.user;
        data.userId = req.user.id;
        applyColumnDefaults(repo, data);
        const saved = await repo.save(data);
        res.status(201).json(saved);
    }));
    router.put("/:id", ...writeMw, asyncHandler(async (req, res) => {
        const repo = req.db.getRepository(entity);
        const existing = await repo.findOne({ where: { id: String(req.params.id), userId: req.user.id } });
        if (!existing)
            throw notFound(`${resourceName} not found`);
        const body = { ...req.body };
        delete body.id;
        delete body.userId;
        delete body.user;
        const merged = repo.merge(existing, body);
        applyColumnDefaults(repo, merged);
        res.json(await repo.save(merged));
    }));
    router.delete("/:id", asyncHandler(async (req, res) => {
        const repo = req.db.getRepository(entity);
        const existing = await repo.findOne({ where: { id: String(req.params.id), userId: req.user.id } });
        if (!existing)
            throw notFound(`${resourceName} not found`);
        await repo.remove(existing);
        res.json({ success: true });
    }));
    return router;
}
