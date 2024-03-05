import { Item } from '../models/itemModel';
import { DBService } from './dbService';

class CustomError extends Error {
  status?: number;
}

export class UserService {
  static async viewGroceryItems(): Promise<Item[]> {
    const query = 'SELECT * FROM grocery_items';
    const { rows } = await DBService.query(query);
    return rows;
  }

  static async bookGroceryItems(items: Item[]): Promise<Item[]> {
    const bookedItems: Item[] = [];

    // Iterate through each item in the request
    for (const item of items) {
      const { id, inventory } = item;

      // Retrieve the item details from the database
      const selectItemQuery = 'SELECT * FROM grocery_items WHERE id = $1';
      const { rows } = await DBService.query(selectItemQuery, [id]);
      if (rows.length === 0) {
        const error = new CustomError(`Item with ID ${id} not found`);
        error.status = 400
        throw error;
      }

      const dbItem: Item = rows[0];
      const availableinventory = dbItem.inventory;

      // Check if there is enough inventory for the requested inventory
      if (inventory > availableinventory) {
        const error = new CustomError(`Insufficient inventory for item with ID ${id}`);
        error.status = 400
        throw error;
      }

      // Reduce the inventory by the booked inventory
      const updatedInventory = availableinventory - inventory;
      const updateInventoryQuery = 'UPDATE grocery_items SET inventory = $1 WHERE id = $2';
      await DBService.query(updateInventoryQuery, [updatedInventory, id]);

      // Add the booked item to the list
      bookedItems.push({ ...dbItem, inventory });
    }

    return bookedItems;
  }
}
