import { verifyJwt } from "../shared/jwt";
import { unauthorized, forbidden } from "../shared/http-error";
/**
 * Requires a valid bearer token. Populates `req.user` and `req.userEmail`.
 * The tenant database is always resolved from this verified email downstream —
 * never from a client-supplied header — which is what keeps tenants isolated.
 */
export function requireAuth(req, _res, next) {
    const header = req.headers["authorization"] || req.headers["Authorization"];
    const token = typeof header === "string" && header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token)
        return next(unauthorized("Missing bearer token"));
    const payload = verifyJwt(token);
    if (!payload)
        return next(unauthorized("Invalid or expired token"));
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    req.userEmail = payload.email;
    next();
}
export function requireRole(...roles) {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(forbidden());
        }
        next();
    };
}
