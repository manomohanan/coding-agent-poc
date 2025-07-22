import { Order, OrderStatus } from '../types/index.js';
import { createError } from '../middleware/errorHandler.js';

class StoreService {
  private orders: Order[] = [
    {
      id: 1,
      petId: 1,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: false
    }
  ];

  async placeOrder(order: Order): Promise<Order> {
    const newOrder: Order = {
      ...order,
      id: this.orders.length + 1,
      shipDate: order.shipDate || new Date().toISOString(),
      status: order.status || 'placed',
      complete: order.complete || false
    };
    
    this.orders.push(newOrder);
    return newOrder;
  }

  async getOrderById(orderId: number): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw createError('Order not found', 404);
    }
    return order;
  }

  async deleteOrder(orderId: number): Promise<void> {
    const index = this.orders.findIndex(o => o.id === orderId);
    if (index === -1) {
      throw createError('Order not found', 404);
    }
    
    this.orders.splice(index, 1);
  }

  async getInventory(): Promise<Record<string, number>> {
    const inventory: Record<string, number> = {};
    
    this.orders.forEach(order => {
      const status = order.status || 'unknown';
      inventory[status] = (inventory[status] || 0) + (order.quantity || 0);
    });
    
    return inventory;
  }
}

export const storeService = new StoreService();