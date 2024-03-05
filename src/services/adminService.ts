import { Item } from '../models/itemModel';
import { DBService } from './dbService';

class CustomError extends Error {
  status?: number;
}

export class AdminService {
  static async addGroceryItem(item: Item): Promise<Item> {
    const { name, price, inventory } = item;

    // Check if item with the same name already exists
    const existingItemQuery = 'SELECT EXISTS(SELECT 1 FROM grocery_items WHERE name = $1)';
    const result = await DBService.query(existingItemQuery, [name]);

    if (result.rows[0].exists) {
      const error = new CustomError(`Item with name '${name}' already exists`);
      error.status = 400;
      throw error;
    }

    const query = 'INSERT INTO grocery_items (name, price, inventory) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, price, inventory];
    const { rows } = await DBService.query(query, values);
    return rows[0];
  }

  static async viewGroceryItems(): Promise<Item[]> {
    const query = 'SELECT * FROM grocery_items';
    const { rows } = await DBService.query(query);
    return rows;
  }

  static async removeGroceryItem(itemId: number): Promise<void> {
    const query = 'DELETE FROM grocery_items WHERE id = $1';
    const values = [itemId];
    await DBService.query(query, values);
  }

  static async updateGroceryItem(itemId: number, updatedItem: Item): Promise<Item> {
    const { name, price, inventory } = updatedItem;
    const query = 'UPDATE grocery_items SET name = $1, price = $2, inventory = $3 WHERE id = $4 RETURNING *';
    const values = [name, price, inventory, itemId];
    const { rows } = await DBService.query(query, values);
    return rows[0];
  }

  static async manageInventory(itemId: number, newInventory: number): Promise<Item> {
    const query = 'UPDATE grocery_items SET inventory = $1 WHERE id = $2 RETURNING *';
    const values = [newInventory, itemId];
    const { rows } = await DBService.query(query, values);
    return rows[0];
  }
}
