import { Pool } from 'pg';

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST ?? 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT!) ?? 5432,
});

export class DBService {
  static async query(text: string, params?: any[]) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  }

  static async createTableIfNotExists() {
    const query = `
      CREATE TABLE IF NOT EXISTS grocery_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        inventory INT NOT NULL
      )
    `;
  
    try {
      const client = await pool.connect();
      await client.query(query);
      client.release();
    } catch (error) {
      throw new Error(`Error creating table: ${error}`);
    }
  }
}
