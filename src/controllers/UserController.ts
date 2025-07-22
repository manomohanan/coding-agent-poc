import Controller from './Controller';
import service from '../services/UserService';
import { OpenApiRequest } from '../types';
import { Response } from 'express';

const createUser = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.createUser);
};

const createUsersWithListInput = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.createUsersWithListInput);
};

const deleteUser = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.deleteUser);
};

const getUserByName = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.getUserByName);
};

const loginUser = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.loginUser);
};

const logoutUser = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.logoutUser);
};

const updateUser = async (request: OpenApiRequest, response: Response): Promise<void> => {
  await Controller.handleRequest(request, response, service.updateUser);
};

export default {
  createUser,
  createUsersWithListInput,
  deleteUser,
  getUserByName,
  loginUser,
  logoutUser,
  updateUser,
};