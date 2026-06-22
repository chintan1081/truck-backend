import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { requireAuth } from "../../middleware/auth.middleware";
import * as controller from "./chat.controller";
/**
 * Authenticated chat endpoint. It does not need a tenant DB connection, so it is
 * mounted separately from the tenant-scoped CRUD router.
 */
export const chatRouter = Router();
chatRouter.post("/", requireAuth, asyncHandler(controller.chat));
chatRouter.post("/insights", requireAuth, asyncHandler(controller.insights));
chatRouter.post("/parse-bill", requireAuth, asyncHandler(controller.parseBill));
