import { Router } from 'express';
import * as petController from '../controllers/petController.js';

const router = Router();

router.post('/pet', petController.addPet);
router.put('/pet', petController.updatePet);
router.get('/pet/findByStatus', petController.findPetsByStatus);
router.get('/pet/findByTags', petController.findPetsByTags);
router.get('/pet/:petId', petController.getPetById);
router.post('/pet/:petId', petController.updatePetWithForm);
router.delete('/pet/:petId', petController.deletePet);
router.post('/pet/:petId/uploadImage', petController.uploadFile);

export default router;