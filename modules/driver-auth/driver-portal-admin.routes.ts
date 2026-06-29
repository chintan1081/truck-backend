import { Router, Request, Response } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { setDriverPortalPassword } from "./driver-auth.service";

/**
 * Admin-only: lets the tenant set/reset a driver's portal login password.
 * Mounted at /drivers, before the generic CRUD router for the same path, so
 * this specific sub-route is handled first and everything else falls through.
 */
export const driverPortalAdminRouter = Router({ mergeParams: true });

driverPortalAdminRouter.post(
  "/:id/portal-password",
  asyncHandler(async (req: Request, res: Response) => {
    await setDriverPortalPassword(String(req.params.id), req.user!.id, req.body?.password);
    res.json({ success: true });
  })
);
