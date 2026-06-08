import { Request, Response } from "express";
import { generateChatReply } from "./chat.service";
import { HttpError } from "../../shared/http-error";

export async function chat(req: Request, res: Response): Promise<void> {
  try {
    const text = await generateChatReply(req.body?.messages);
    res.json({ text });
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(500, "AI assistant is temporarily unavailable. Please try again.");
  }
}
