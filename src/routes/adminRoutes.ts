import express from 'express';
import { AdminController } from '../controllers/adminController';

const router = express.Router();

router.post('/items', AdminController.addGroceryItem);
router.get('/items', AdminController.viewGroceryItems);
router.delete('/items/:itemId', AdminController.removeGroceryItem);
router.put('/items/:itemId', AdminController.updateGroceryItem);
router.put('/items/:itemId/inventory', AdminController.manageInventory);

export default router;
