import { Request, Response } from "express";
import { generateChatReply, generateFinancialInsights, parseDieselBillImage, isQuotaError } from "./chat.service";
import { HttpError } from "../../shared/http-error";

export async function chat(req: Request, res: Response): Promise<void> {
  try {
    const text = await generateChatReply(req.body?.messages);
    res.json({ text });
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (isQuotaError(err)) throw new HttpError(429, "AI quota reached. Please try again later.");
    throw new HttpError(500, "AI assistant is temporarily unavailable. Please try again.");
  }
}

export async function insights(req: Request, res: Response): Promise<void> {
  try {
    const text = await generateFinancialInsights(req.body?.data ?? {});
    res.json({ text });
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (isQuotaError(err)) throw new HttpError(429, "AI quota reached. Please try again later.");
    throw new HttpError(500, "AI insights are temporarily unavailable. Please try again.");
  }
}

export async function parseBill(req: Request, res: Response): Promise<void> {
  try {
    const data = await parseDieselBillImage(req.body?.image);
    res.json({ data });
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (isQuotaError(err)) throw new HttpError(429, "AI quota reached. Please try again later.");
    throw new HttpError(500, "Bill scanning is temporarily unavailable. Please enter the details manually.");
  }
}
