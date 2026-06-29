import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../../shared/jwt";
import { unauthorized } from "../../shared/http-error";

/**
 * Requires a valid driver-portal bearer token (signed by driver-auth.service,
 * payload.type === 'DRIVER'). Populates `req.driver`. Entirely separate from
 * `requireAuth` — drivers are DriverEntity rows, not UserEntity rows.
 */
export function requireDriverAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers["authorization"] || req.headers["Authorization"];
  const token = typeof header === "string" && header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(unauthorized("Missing bearer token"));

  const payload = verifyJwt(token);
  if (!payload || payload.type !== "DRIVER") return next(unauthorized("Invalid or expired token"));

  req.driver = { id: payload.sub, ownerId: payload.ownerId, phoneNumber: payload.phoneNumber, name: payload.name };
  next();
}
