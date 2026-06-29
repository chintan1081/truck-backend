import { Request, Response } from "express";
import * as service from "./driver-auth.service";
import { HttpError } from "../../shared/http-error";

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const result = await service.loginDriver(req.body || {});
    res.json(result);
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(400, "Invalid phone number or password.");
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  res.json({ driver: req.driver });
}

export async function listMyOrders(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  const data = await service.getMyOrders(ownerId, phoneNumber);
  res.json({ data });
}

export async function accept(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  const order = await service.acceptOrder(String(req.params.id), ownerId, phoneNumber);
  res.json(order);
}

export async function reject(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  await service.rejectOrder(String(req.params.id), ownerId, phoneNumber);
  res.json({ success: true });
}

export async function pickup(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  const { challanNumber } = req.body || {};
  const order = await service.pickupOrder(String(req.params.id), ownerId, phoneNumber, challanNumber);
  res.json(order);
}

export async function deliver(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  const order = await service.deliverOrder(String(req.params.id), ownerId, phoneNumber);
  res.json(order);
}

export async function myTruck(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  const truck = await service.getMyTruck(ownerId, phoneNumber);
  res.json({ truck });
}

export async function myEarnings(req: Request, res: Response): Promise<void> {
  const { ownerId, phoneNumber } = req.driver!;
  const data = await service.getMyEarnings(ownerId, phoneNumber);
  res.json(data);
}
