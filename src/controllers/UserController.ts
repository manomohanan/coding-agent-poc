/**
 * The UserController class handles all user-related HTTP requests.
 * It uses dependency injection to receive the UserService and directly calls service methods.
 */

import Controller from './Controller';
import UserService from '../services/UserService';
import { OpenApiRequest, ServiceError } from '../types';
import { Response } from 'express';

class UserController extends Controller {
  private userService: typeof UserService;

  constructor(userService: typeof UserService) {
    super();
    this.userService = userService;
  }

  public async createUser(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.createUser(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async createUsersWithListInput(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.createUsersWithListInput(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async deleteUser(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.deleteUser(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async getUserByName(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.getUserByName(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async loginUser(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.loginUser(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async logoutUser(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.logoutUser(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async updateUser(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.userService.updateUser(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }
}

// Create and export a singleton instance with the service injected
const userController = new UserController(UserService);

export default userController;