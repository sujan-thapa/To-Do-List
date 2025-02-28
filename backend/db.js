// database credentials

// import { Pool } from "pg";
import pg from 'pg';
// import dotenv from 'dotenv';
// import 'dotenv/config';
// dotenv.config();
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });



const {Pool} = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

export default pool;

// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// module.exports = pool;