import { Request, Response, NextFunction } from 'express';
import { User } from '../types/index.js';
import { userService } from '../services/userService.js';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: User = req.body;
    const createdUser = await userService.createUser(user);
    res.status(200).json(createdUser);
  } catch (error) {
    next(error);
  }
};

export const createUsersWithArrayInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users: User[] = req.body;
    const createdUsers = await userService.createUsersWithArrayInput(users);
    res.status(200).json(createdUsers);
  } catch (error) {
    next(error);
  }
};

export const createUsersWithListInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users: User[] = req.body;
    const createdUsers = await userService.createUsersWithListInput(users);
    res.status(200).json(createdUsers);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.query;
    const loginResponse = await userService.loginUser(username as string, password as string);
    
    res.set({
      'X-Rate-Limit': String(loginResponse.rateLimit),
      'X-Expires-After': loginResponse.expiresAfter
    });
    
    res.status(200).json(loginResponse.token);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userService.logoutUser();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const getUserByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username = req.params.username;
    const user = await userService.getUserByName(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username = req.params.username;
    const user: User = req.body;
    const updatedUser = await userService.updateUser(username, user);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username = req.params.username;
    await userService.deleteUser(username);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};