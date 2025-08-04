import { describe, it, expect, beforeEach } from 'vitest';
import { storeService } from '../services/storeService.js';
import { Order, OrderStatus } from '../types/index.js';

describe('StoreService', () => {
  let testOrder: Order;

  beforeEach(() => {
    testOrder = {
      petId: 1,
      quantity: 2,
      status: 'placed',
      complete: false
    };
  });

  describe('placeOrder', () => {
    it('should place a new order successfully', async () => {
      const result = await storeService.placeOrder(testOrder);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.petId).toBe(testOrder.petId);
      expect(result.quantity).toBe(testOrder.quantity);
      expect(result.status).toBe(testOrder.status);
      expect(result.shipDate).toBeDefined();
    });

    it('should set default values for missing fields', async () => {
      const minimalOrder: Order = {
        petId: 1,
        quantity: 1
      };
      
      const result = await storeService.placeOrder(minimalOrder);
      
      expect(result.status).toBe('placed');
      expect(result.complete).toBe(false);
      expect(result.shipDate).toBeDefined();
    });
  });

  describe('getOrderById', () => {
    it('should get an order by id', async () => {
      const orderId = 1;
      const result = await storeService.getOrderById(orderId);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(orderId);
    });

    it('should throw error for non-existent order', async () => {
      const orderId = 999;
      
      await expect(storeService.getOrderById(orderId)).rejects.toThrow('Order not found');
    });
  });

  describe('deleteOrder', () => {
    it('should delete an existing order', async () => {
      const newOrder = await storeService.placeOrder(testOrder);
      
      await expect(storeService.deleteOrder(newOrder.id!)).resolves.not.toThrow();
      await expect(storeService.getOrderById(newOrder.id!)).rejects.toThrow('Order not found');
    });

    it('should throw error when deleting non-existent order', async () => {
      const orderId = 999;
      
      await expect(storeService.deleteOrder(orderId)).rejects.toThrow('Order not found');
    });
  });

  describe('getInventory', () => {
    it('should return inventory counts by status', async () => {
      const result = await storeService.getInventory();
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result.placed).toBeDefined();
    });

    it('should update inventory when new orders are placed', async () => {
      const initialInventory = await storeService.getInventory();
      const initialPlacedCount = initialInventory.placed || 0;
      
      await storeService.placeOrder({ ...testOrder, quantity: 5 });
      
      const updatedInventory = await storeService.getInventory();
      expect(updatedInventory.placed).toBe(initialPlacedCount + 5);
    });
  });
});