/**
 * The StoreController class handles all store-related HTTP requests.
 * It uses dependency injection to receive the StoreService and directly calls service methods.
 */

import Controller from './Controller';
import StoreService from '../services/StoreService';
import { OpenApiRequest, ServiceError } from '../types';
import { Response } from 'express';

class StoreController extends Controller {
  private storeService: typeof StoreService;

  constructor(storeService: typeof StoreService) {
    super();
    this.storeService = storeService;
  }

  public async deleteOrder(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.storeService.deleteOrder(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async getInventory(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.storeService.getInventory(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async getOrderById(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.storeService.getOrderById(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async placeOrder(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.storeService.placeOrder(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }
}

// Create and export a singleton instance with the service injected
const storeController = new StoreController(StoreService);

export default storeController;