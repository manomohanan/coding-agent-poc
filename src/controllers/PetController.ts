/**
 * The PetController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Controller.ts - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import Controller from './Controller';
import service from '../services/PetService';
import { OpenApiRequest } from '../types';
import { Response } from 'express';

const addPet = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.addPet);
};

const deletePet = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.deletePet);
};

const findPetsByStatus = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.findPetsByStatus);
};

const findPetsByTags = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.findPetsByTags);
};

const getPetById = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.getPetById);
};

const updatePet = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.updatePet);
};

const updatePetWithForm = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.updatePetWithForm);
};

const uploadFile = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.uploadFile);
};

export default {
  addPet,
  deletePet,
  findPetsByStatus,
  findPetsByTags,
  getPetById,
  updatePet,
  updatePetWithForm,
  uploadFile,
};