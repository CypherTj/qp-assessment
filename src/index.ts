import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import adminRoutes from "./routes/adminRoutes";
import { DBService } from './services/dbService';

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

// Create table if not exists when the application starts
DBService.createTableIfNotExists()
  .then(() => {
    console.log(`Database table created successfully (if it didn't exist)`);
  })
  .catch((error) => {
    console.error('Error creating database table:', error);
    process.exit(1); // Exit the application if table creation fails
  });

app.use("/admin", adminRoutes);

app.use("/", (_req, res) => {
  res.status(404).send({
    error: "Sorry, URL not found.",
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});