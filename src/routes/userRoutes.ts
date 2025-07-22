import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.post('/user', userController.createUser);
router.post('/user/createWithArray', userController.createUsersWithArrayInput);
router.post('/user/createWithList', userController.createUsersWithListInput);
router.get('/user/login', userController.loginUser);
router.get('/user/logout', userController.logoutUser);
router.get('/user/:username', userController.getUserByName);
router.put('/user/:username', userController.updateUser);
router.delete('/user/:username', userController.deleteUser);

export default router;