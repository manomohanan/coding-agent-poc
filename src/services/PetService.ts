import Service from './Service';
import { ServiceResponse, RequestParams } from '../types';

interface Pet {
  id?: number;
  name: string;
  category?: {
    id?: number;
    name?: string;
  };
  photoUrls: string[];
  tags?: Array<{
    id?: number;
    name?: string;
  }>;
  status?: 'available' | 'pending' | 'sold';
}

/**
 * Add a new pet to the store.
 */
const addPet = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { pet } = params;
      resolve(Service.successResponse({
        pet,
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
 * Deletes a pet.
 */
const deletePet = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { petId, apiUnderscorekey } = params;
      resolve(Service.successResponse({
        petId,
        apiUnderscorekey,
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
 * Finds Pets by status.
 */
const findPetsByStatus = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { status } = params;
      const mockPets: Pet[] = [
        {
          id: 1,
          name: 'Doggie',
          category: { id: 1, name: 'Dogs' },
          photoUrls: ['string'],
          tags: [{ id: 1, name: 'tag1' }],
          status: 'available'
        }
      ];
      
      resolve(Service.successResponse(mockPets));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        400,
      ));
    }
  },
);

/**
 * Finds Pets by tags.
 */
const findPetsByTags = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { tags } = params;
      const mockPets: Pet[] = [
        {
          id: 1,
          name: 'Doggie',
          category: { id: 1, name: 'Dogs' },
          photoUrls: ['string'],
          tags: [{ id: 1, name: 'tag1' }],
          status: 'available'
        }
      ];
      
      resolve(Service.successResponse(mockPets));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        400,
      ));
    }
  },
);

/**
 * Find pet by ID.
 */
const getPetById = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { petId } = params;
      const mockPet: Pet = {
        id: petId,
        name: 'Doggie',
        category: { id: 1, name: 'Dogs' },
        photoUrls: ['string'],
        tags: [{ id: 1, name: 'tag1' }],
        status: 'available'
      };
      
      resolve(Service.successResponse(mockPet));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Pet not found',
        404,
      ));
    }
  },
);

/**
 * Update an existing pet.
 */
const updatePet = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { pet } = params;
      resolve(Service.successResponse(pet));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        400,
      ));
    }
  },
);

/**
 * Updates a pet in the store with form data.
 */
const updatePetWithForm = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { petId, name, status } = params;
      resolve(Service.successResponse({
        petId,
        name,
        status,
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
 * Uploads an image.
 */
const uploadFile = (params: RequestParams): Promise<ServiceResponse> => new Promise(
  async (resolve, reject) => {
    try {
      const { petId, additionalMetadata, file } = params;
      resolve(Service.successResponse({
        code: 200,
        type: 'success',
        message: 'File uploaded successfully',
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        (e as Error).message || 'Invalid input',
        400,
      ));
    }
  },
);

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