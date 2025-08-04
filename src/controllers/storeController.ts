import { Request, Response, NextFunction } from 'express';
import { Order } from '../types/index.js';
import { storeService } from '../services/storeService.js';

export const getInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const inventory = await storeService.getInventory();
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order: Order = req.body;
    const createdOrder = await storeService.placeOrder(order);
    res.status(200).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderId = parseInt(req.params.orderId);
    const order = await storeService.getOrderById(orderId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderId = parseInt(req.params.orderId);
    await storeService.deleteOrder(orderId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};