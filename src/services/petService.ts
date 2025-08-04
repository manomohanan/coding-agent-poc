import { Pet, PetStatus } from '../types/index.js';
import { createError } from '../middleware/errorHandler.js';

class PetService {
  private pets: Pet[] = [
    {
      id: 1,
      name: 'Doggie',
      photoUrls: ['https://example.com/photo1.jpg'],
      status: 'available',
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'friendly' }]
    }
  ];

  async addPet(pet: Pet): Promise<Pet> {
    const newPet: Pet = {
      ...pet,
      id: this.pets.length + 1
    };
    
    this.pets.push(newPet);
    return newPet;
  }

  async updatePet(pet: Pet): Promise<Pet> {
    const index = this.pets.findIndex(p => p.id === pet.id);
    if (index === -1) {
      throw createError('Pet not found', 404);
    }
    
    this.pets[index] = { ...this.pets[index], ...pet };
    return this.pets[index];
  }

  async findPetsByStatus(status: PetStatus[]): Promise<Pet[]> {
    return this.pets.filter(pet => pet.status && status.includes(pet.status));
  }

  async findPetsByTags(tags: string[]): Promise<Pet[]> {
    return this.pets.filter(pet => 
      pet.tags?.some(tag => tag.name && tags.includes(tag.name))
    );
  }

  async getPetById(petId: number): Promise<Pet> {
    const pet = this.pets.find(p => p.id === petId);
    if (!pet) {
      throw createError('Pet not found', 404);
    }
    return pet;
  }

  async deletePet(petId: number): Promise<void> {
    const index = this.pets.findIndex(p => p.id === petId);
    if (index === -1) {
      throw createError('Pet not found', 404);
    }
    
    this.pets.splice(index, 1);
  }

  async uploadFile(petId: number, additionalMetadata?: string, file?: any): Promise<{ message: string }> {
    const pet = await this.getPetById(petId);
    
    return {
      message: `File uploaded successfully for pet ${pet.name}. Metadata: ${additionalMetadata || 'none'}`
    };
  }
}

export const petService = new PetService();