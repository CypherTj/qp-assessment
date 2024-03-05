import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  static async viewGroceryItems(req: Request, res: Response) {
    try {
      const items = await UserService.viewGroceryItems();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async bookGroceryItems(req: Request, res: Response) {
    try {
      const { items } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).send({
          error: 'Items array is missing or empty',
        })
      }
      const order = await UserService.bookGroceryItems(items);
      res.json(order);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}
