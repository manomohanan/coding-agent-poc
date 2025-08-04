import { User, LoginResponse } from '../types/index.js';
import { createError } from '../middleware/errorHandler.js';

class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+1234567890',
      userStatus: 1
    }
  ];

  async createUser(user: User): Promise<User> {
    const existingUser = this.users.find(u => u.username === user.username);
    if (existingUser) {
      throw createError('Username already exists', 400);
    }

    const newUser: User = {
      ...user,
      id: this.users.length + 1
    };
    
    this.users.push(newUser);
    
    const { password, ...userResponse } = newUser;
    return userResponse;
  }

  async createUsersWithArrayInput(users: User[]): Promise<User[]> {
    const createdUsers: User[] = [];
    
    for (const user of users) {
      try {
        const createdUser = await this.createUser(user);
        createdUsers.push(createdUser);
      } catch (error) {
        console.warn(`Failed to create user ${user.username}:`, error);
      }
    }
    
    return createdUsers;
  }

  async createUsersWithListInput(users: User[]): Promise<User[]> {
    return this.createUsersWithArrayInput(users);
  }

  async loginUser(username?: string, password?: string): Promise<LoginResponse> {
    if (!username || !password) {
      throw createError('Username and password are required', 400);
    }

    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      throw createError('Invalid username/password supplied', 400);
    }

    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    const expiresAfter = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    return {
      token,
      expiresAfter,
      rateLimit: 100
    };
  }

  async logoutUser(): Promise<void> {
    // In a real implementation, this would invalidate the session/token
    console.log('User logged out successfully');
  }

  async getUserByName(username: string): Promise<User> {
    const user = this.users.find(u => u.username === username);
    if (!user) {
      throw createError('User not found', 404);
    }
    
    const { password, ...userResponse } = user;
    return userResponse;
  }

  async updateUser(username: string, user: User): Promise<User> {
    const index = this.users.findIndex(u => u.username === username);
    if (index === -1) {
      throw createError('User not found', 404);
    }
    
    this.users[index] = { ...this.users[index], ...user, username };
    
    const { password, ...userResponse } = this.users[index];
    return userResponse;
  }

  async deleteUser(username: string): Promise<void> {
    const index = this.users.findIndex(u => u.username === username);
    if (index === -1) {
      throw createError('User not found', 404);
    }
    
    this.users.splice(index, 1);
  }
}

export const userService = new UserService();