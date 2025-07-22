/**
 * The PetController class handles all pet-related HTTP requests.
 * It uses dependency injection to receive the PetService and directly calls service methods.
 */

import Controller from './Controller';
import PetService from '../services/PetService';
import { OpenApiRequest, ServiceResponse, ServiceError } from '../types';
import { Response } from 'express';

class PetController extends Controller {
  private petService: typeof PetService;

  constructor(petService: typeof PetService) {
    super();
    this.petService = petService;
  }

  public async addPet(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.addPet(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async deletePet(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.deletePet(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async findPetsByStatus(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.findPetsByStatus(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async findPetsByTags(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.findPetsByTags(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async getPetById(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.getPetById(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async updatePet(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.updatePet(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async updatePetWithForm(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.updatePetWithForm(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }

  public async uploadFile(request: OpenApiRequest, response: Response): Promise<void> {
    try {
      const params = this.collectRequestParams(request);
      const serviceResponse = await this.petService.uploadFile(params);
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error as ServiceError);
    }
  }
}

// Create and export a singleton instance with the service injected
const petController = new PetController(PetService);

export default petController;