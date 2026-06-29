import type { DataSource } from "typeorm";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

/** Authenticated driver principal, populated by `requireDriverAuth`. Separate
 * from `AuthUser` — drivers are `DriverEntity` rows, not `UserEntity` rows.
 * `ownerId` is the admin `userId` that owns the driver record/orders. */
export interface AuthDriver {
  id: string;
  ownerId: string;
  phoneNumber: string;
  name: string;
}

/**
 * Augment Express's Request so `req.user`, `req.userEmail` and `req.db` are
 * strongly typed wherever they are populated by middleware. This avoids the
 * `req: any` casts that were scattered across the old route handlers.
 */
declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
    userEmail?: string;
    db?: DataSource;
    driver?: AuthDriver;
  }
}
