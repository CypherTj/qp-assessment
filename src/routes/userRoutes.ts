import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.get('/items', UserController.viewGroceryItems);
router.post('/orders', UserController.bookGroceryItems);

export default router;
