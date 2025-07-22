import Controller from './Controller';
import service from '../services/StoreService';
import { OpenApiRequest } from '../types';
import { Response } from 'express';

const deleteOrder = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.deleteOrder);
};

const getInventory = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.getInventory);
};

const getOrderById = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.getOrderById);
};

const placeOrder = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.placeOrder);
};

export default {
  deleteOrder,
  getInventory,
  getOrderById,
  placeOrder,
};