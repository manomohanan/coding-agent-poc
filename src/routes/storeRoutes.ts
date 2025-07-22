import { Router } from 'express';
import * as storeController from '../controllers/storeController.js';

const router = Router();

router.get('/store/inventory', storeController.getInventory);
router.post('/store/order', storeController.placeOrder);
router.get('/store/order/:orderId', storeController.getOrderById);
router.delete('/store/order/:orderId', storeController.deleteOrder);

export default router;