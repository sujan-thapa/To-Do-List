import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './route.js';
import cors from 'cors'
// Convert the module URL to a file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// dotenv.config();
const app = express()

const port = process.env.PORT || 3000
// Middleware to parse JSON
app.use(express.json());

// Middleware
app.use(cors());

// const route = app.use("/api", routes);
// Routes
app.use("/api", routes);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Server running at  http://localhost:${port}`)
})