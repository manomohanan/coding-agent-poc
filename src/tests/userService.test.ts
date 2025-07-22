import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userService } from '../services/userService.js';
import { User } from '../types/index.js';

describe('UserService', () => {
  let testUser: User;

  beforeEach(() => {
    // Create a unique username for each test to avoid conflicts
    const timestamp = Date.now();
    testUser = {
      username: `testuser_${timestamp}`,
      firstName: 'Test',
      lastName: 'User',
      email: `test_${timestamp}@example.com`,
      password: 'password123',
      phone: '+1234567890',
      userStatus: 1
    };
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const result = await userService.createUser(testUser);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.username).toBe(testUser.username);
      expect(result.firstName).toBe(testUser.firstName);
      expect(result.password).toBeUndefined(); // Password should be excluded from response
    });

    it('should throw error for duplicate username', async () => {
      await userService.createUser(testUser);
      
      await expect(userService.createUser(testUser)).rejects.toThrow('Username already exists');
    });
  });

  describe('loginUser', () => {
    it('should login with valid credentials', async () => {
      const result = await userService.loginUser('user1', 'password123');
      
      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.expiresAfter).toBeDefined();
      expect(result.rateLimit).toBe(100);
    });

    it('should throw error for invalid credentials', async () => {
      await expect(userService.loginUser('wronguser', 'wrongpass')).rejects.toThrow('Invalid username/password supplied');
    });

    it('should throw error for missing credentials', async () => {
      await expect(userService.loginUser()).rejects.toThrow('Username and password are required');
    });
  });

  describe('getUserByName', () => {
    it('should get user by username', async () => {
      const result = await userService.getUserByName('user1');
      
      expect(result).toBeDefined();
      expect(result.username).toBe('user1');
      expect(result.password).toBeUndefined(); // Password should be excluded
    });

    it('should throw error for non-existent user', async () => {
      await expect(userService.getUserByName('nonexistent')).rejects.toThrow('User not found');
    });
  });

  describe('updateUser', () => {
    it('should update existing user', async () => {
      const updatedData = { firstName: 'Updated', lastName: 'Name' };
      const result = await userService.updateUser('user1', updatedData);
      
      expect(result.firstName).toBe('Updated');
      expect(result.lastName).toBe('Name');
      expect(result.username).toBe('user1'); // Username should remain unchanged
    });

    it('should throw error when updating non-existent user', async () => {
      await expect(userService.updateUser('nonexistent', testUser)).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', async () => {
      const newUser = await userService.createUser(testUser);
      
      await expect(userService.deleteUser(testUser.username!)).resolves.not.toThrow();
      await expect(userService.getUserByName(testUser.username!)).rejects.toThrow('User not found');
    });

    it('should throw error when deleting non-existent user', async () => {
      await expect(userService.deleteUser('nonexistent')).rejects.toThrow('User not found');
    });
  });

  describe('createUsersWithArrayInput', () => {
    it('should create multiple users', async () => {
      const timestamp = Date.now();
      const users: User[] = [
        { ...testUser, username: `testuser1_${timestamp}` },
        { ...testUser, username: `testuser2_${timestamp}` }
      ];
      
      const result = await userService.createUsersWithArrayInput(users);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });

    it('should handle partial failures gracefully', async () => {
      const timestamp = Date.now();
      const users: User[] = [
        { ...testUser, username: `testuser3_${timestamp}` },
        { ...testUser, username: 'user1' } // This should fail due to existing username
      ];
      
      const result = await userService.createUsersWithArrayInput(users);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1); // Only one should succeed
    });
  });

  describe('logoutUser', () => {
    it('should logout user successfully', async () => {
      await expect(userService.logoutUser()).resolves.not.toThrow();
    });
  });
});