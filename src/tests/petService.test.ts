import { describe, it, expect, beforeEach } from 'vitest';
import { petService } from '../services/petService.js';
import { Pet, PetStatus } from '../types/index.js';

describe('PetService', () => {
  let testPet: Pet;

  beforeEach(() => {
    testPet = {
      name: 'Test Pet',
      photoUrls: ['https://example.com/test.jpg'],
      status: 'available',
      category: { id: 1, name: 'Test Category' },
      tags: [{ id: 1, name: 'test-tag' }]
    };
  });

  describe('addPet', () => {
    it('should add a new pet successfully', async () => {
      const result = await petService.addPet(testPet);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(testPet.name);
      expect(result.photoUrls).toEqual(testPet.photoUrls);
      expect(result.status).toBe(testPet.status);
    });
  });

  describe('findPetsByStatus', () => {
    it('should find pets by status', async () => {
      const statuses: PetStatus[] = ['available'];
      const result = await petService.findPetsByStatus(statuses);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].status).toBe('available');
    });

    it('should return empty array for non-existent status', async () => {
      const statuses: PetStatus[] = ['sold'];
      const result = await petService.findPetsByStatus(statuses);
      
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getPetById', () => {
    it('should get a pet by id', async () => {
      const petId = 1;
      const result = await petService.getPetById(petId);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(petId);
    });

    it('should throw error for non-existent pet', async () => {
      const petId = 999;
      
      await expect(petService.getPetById(petId)).rejects.toThrow('Pet not found');
    });
  });

  describe('updatePet', () => {
    it('should update an existing pet', async () => {
      const petId = 1;
      const existingPet = await petService.getPetById(petId);
      const updatedData = { ...existingPet, name: 'Updated Pet Name' };
      
      const result = await petService.updatePet(updatedData);
      
      expect(result.name).toBe('Updated Pet Name');
      expect(result.id).toBe(petId);
    });

    it('should throw error when updating non-existent pet', async () => {
      const nonExistentPet = { ...testPet, id: 999 };
      
      await expect(petService.updatePet(nonExistentPet)).rejects.toThrow('Pet not found');
    });
  });

  describe('deletePet', () => {
    it('should delete an existing pet', async () => {
      const addedPet = await petService.addPet(testPet);
      
      await expect(petService.deletePet(addedPet.id!)).resolves.not.toThrow();
      await expect(petService.getPetById(addedPet.id!)).rejects.toThrow('Pet not found');
    });

    it('should throw error when deleting non-existent pet', async () => {
      const petId = 999;
      
      await expect(petService.deletePet(petId)).rejects.toThrow('Pet not found');
    });
  });

  describe('uploadFile', () => {
    it('should handle file upload for existing pet', async () => {
      const petId = 1;
      const metadata = 'test metadata';
      
      const result = await petService.uploadFile(petId, metadata);
      
      expect(result).toBeDefined();
      expect(result.message).toContain('File uploaded successfully');
      expect(result.message).toContain(metadata);
    });
  });
});