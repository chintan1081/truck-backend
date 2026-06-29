import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { rateLimit } from "../../middleware/rate-limit.middleware";
import { config } from "../../config/env";
import { requireDriverAuth } from "./driver-auth.middleware";
import * as controller from "./driver-auth.controller";

/**
 * Public driver-portal router mounted at /api/driver-auth, independent of the
 * admin /api router. Only `login` is public; everything else requires
 * requireDriverAuth (a driver-portal JWT, not the admin requireAuth token).
 */
export const driverAuthRouter = Router();

const loginLimiter = rateLimit({ windowMs: config.rateLimit.windowMs, max: config.rateLimit.max });

driverAuthRouter.post("/login", loginLimiter, asyncHandler(controller.login));
driverAuthRouter.get("/me", requireDriverAuth, asyncHandler(controller.me));
driverAuthRouter.get("/orders", requireDriverAuth, asyncHandler(controller.listMyOrders));
driverAuthRouter.post("/orders/:id/accept", requireDriverAuth, asyncHandler(controller.accept));
driverAuthRouter.post("/orders/:id/reject", requireDriverAuth, asyncHandler(controller.reject));
driverAuthRouter.post("/orders/:id/pickup", requireDriverAuth, asyncHandler(controller.pickup));
driverAuthRouter.post("/orders/:id/deliver", requireDriverAuth, asyncHandler(controller.deliver));
driverAuthRouter.get("/truck", requireDriverAuth, asyncHandler(controller.myTruck));
driverAuthRouter.get("/earnings", requireDriverAuth, asyncHandler(controller.myEarnings));
