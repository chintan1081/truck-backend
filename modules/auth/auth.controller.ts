import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { getDataSource } from "../../db/data-source";
import { UserEntity } from "../../db/entities";
import { HttpError } from "../../shared/http-error";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const result = await registerUser(req.body || {});
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(400, err instanceof Error ? err.message : "Registration failed. Please check your details.");
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const result = await loginUser(req.body || {});
    res.json(result);
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(400, err instanceof Error ? err.message : "Invalid email or password.");
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  try {
    const db = await getDataSource();
    const user = await db.getRepository(UserEntity).findOne({ where: { id: req.user!.id } });
    res.json({
      user: {
        id: req.user!.id,
        email: req.user!.email,
        role: req.user!.role,
        name: user?.name ?? null,
        profilePhoto: user?.profilePhoto ?? null,
      },
    });
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(500, "Failed to load user profile. Please try again.");
  }
}
