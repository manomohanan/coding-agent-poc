import { Request, Response, NextFunction } from 'express';
import { Pet, PetStatus } from '../types/index.js';
import { petService } from '../services/petService.js';

export const addPet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pet: Pet = req.body;
    const createdPet = await petService.addPet(pet);
    res.status(200).json(createdPet);
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pet: Pet = req.body;
    const updatedPet = await petService.updatePet(pet);
    res.status(200).json(updatedPet);
  } catch (error) {
    next(error);
  }
};

export const findPetsByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const status = req.query.status as string;
    const statusArray: PetStatus[] = status ? status.split(',') as PetStatus[] : [];
    const pets = await petService.findPetsByStatus(statusArray);
    res.status(200).json(pets);
  } catch (error) {
    next(error);
  }
};

export const findPetsByTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tags = req.query.tags as string;
    const tagsArray: string[] = tags ? tags.split(',') : [];
    const pets = await petService.findPetsByTags(tagsArray);
    res.status(200).json(pets);
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const petId = parseInt(req.params.petId);
    const pet = await petService.getPetById(petId);
    res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};

export const updatePetWithForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const petId = parseInt(req.params.petId);
    const { name, status } = req.body;
    
    const existingPet = await petService.getPetById(petId);
    const updatedPet = await petService.updatePet({
      ...existingPet,
      ...(name && { name }),
      ...(status && { status })
    });
    
    res.status(200).json(updatedPet);
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const petId = parseInt(req.params.petId);
    await petService.deletePet(petId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const uploadFile = async (req: Request & { file?: any }, res: Response, next: NextFunction): Promise<void> => {
  try {
    const petId = parseInt(req.params.petId);
    const additionalMetadata = req.body.additionalMetadata;
    const file = req.file;
    
    const result = await petService.uploadFile(petId, additionalMetadata, file);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};