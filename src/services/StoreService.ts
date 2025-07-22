import Service from './Service';
import { ServiceResponse, RequestParams } from '../types';

interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
}

/**
 * Delete purchase order by ID.
 */
const deleteOrder = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { orderId } = params;
      resolve(Service.successResponse({
        orderId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        405,
      ));
    }
  },
);

/**
 * Returns pet inventories by status.
 */
const getInventory = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const mockInventory = {
        available: 10,
        pending: 5,
        sold: 3
      };
      
      resolve(Service.successResponse(mockInventory));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        405,
      ));
    }
  },
);

/**
 * Find purchase order by ID.
 */
const getOrderById = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { orderId } = params;
      const mockOrder: Order = {
        id: orderId,
        petId: 198772,
        quantity: 7,
        shipDate: '2023-10-15T10:00:00.000Z',
        status: 'approved',
        complete: true
      };
      
      resolve(Service.successResponse(mockOrder));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Order not found',
        404,
      ));
    }
  },
);

/**
 * Place a new order in the store.
 */
const placeOrder = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { order } = params;
      const newOrder: Order = {
        ...order,
        id: Math.floor(Math.random() * 1000),
        status: 'placed'
      };
      
      resolve(Service.successResponse(newOrder));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        405,
      ));
    }
  },
);

export default {
  deleteOrder,
  getInventory,
  getOrderById,
  placeOrder,
};