import type { Request, Response } from 'express';
import { OrderService } from '../services/orderService.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderService.getOrders();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await OrderService.deleteOrder(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};