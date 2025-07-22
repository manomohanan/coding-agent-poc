import Service from './Service';
import { ServiceResponse, RequestParams } from '../types';

interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

/**
 * Create user.
 */
const createUser = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { user } = params;
      const newUser = {
        ...user,
        id: Math.floor(Math.random() * 1000)
      };
      
      resolve(Service.successResponse(newUser));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        405,
      ));
    }
  },
);

/**
 * Creates list of users with given input array.
 */
const createUsersWithListInput = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { user } = params;
      const usersWithIds = user.map((u: User) => ({
        ...u,
        id: Math.floor(Math.random() * 1000)
      }));
      
      resolve(Service.successResponse(usersWithIds));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        405,
      ));
    }
  },
);

/**
 * Delete user.
 */
const deleteUser = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { username } = params;
      resolve(Service.successResponse({
        message: `User ${username} deleted successfully`
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'User not found',
        404,
      ));
    }
  },
);

/**
 * Get user by username.
 */
const getUserByName = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { username } = params;
      const mockUser: User = {
        id: 1,
        username: username,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        userStatus: 1
      };
      
      resolve(Service.successResponse(mockUser));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'User not found',
        404,
      ));
    }
  },
);

/**
 * Log user into the system.
 */
const loginUser = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { username, password } = params;
      const sessionToken = 'mock-session-token-12345';
      
      resolve(Service.successResponse({
        token: sessionToken,
        message: 'Login successful'
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid username/password supplied',
        400,
      ));
    }
  },
);

/**
 * Log out current logged in user session.
 */
const logoutUser = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        message: 'Logout successful'
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
 * Update user.
 */
const updateUser = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { username, user } = params;
      const updatedUser = {
        ...user,
        username: username
      };
      
      resolve(Service.successResponse(updatedUser));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'User not found',
        404,
      ));
    }
  },
);

export default {
  createUser,
  createUsersWithListInput,
  deleteUser,
  getUserByName,
  loginUser,
  logoutUser,
  updateUser,
};