import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { Item } from '../models/itemModel';

export class AdminController {
  static async addGroceryItem(req: Request, res: Response) {
    try {
      const newItem: Item = await AdminService.addGroceryItem(req.body);
      res.json(newItem);
    } catch (error: any) {
      console.error(error);
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async viewGroceryItems(req: Request, res: Response) {
    try {
      const items: Item[] = await AdminService.viewGroceryItems();
      res.json(items);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async removeGroceryItem(req: Request, res: Response) {
    try {
      const itemId: number = parseInt(req.params.itemId);
      await AdminService.removeGroceryItem(itemId);
      res.status(204).send();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateGroceryItem(req: Request, res: Response) {
    try {
      const itemId: number = parseInt(req.params.itemId);
      const updatedItem: Item = req.body;
      const item: Item = await AdminService.updateGroceryItem(itemId, updatedItem);
      res.json(item);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async manageInventory(req: Request, res: Response) {
    try {
      const itemId: number = parseInt(req.params.itemId);
      const newInventory: number = req.body.inventory;
      const item: Item = await AdminService.manageInventory(itemId, newInventory);
      res.json(item);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
