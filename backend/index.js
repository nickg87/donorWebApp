const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const poolsRoutes = require('./routes/pools');
const donorsRoutes = require('./routes/donors');

require('dotenv').config();
let envPath = process.env.PWD  + '/backend';
envPath = envPath.replace('/backend/backend', '/backend');
require('dotenv-flow').config({
  path: envPath, // This should point to where your .env files are
  node_env: process.env.NODE_ENV || 'development', // Use NODE_ENV to pick the right .env file
});
console.log(`Running in ${process.env.NODE_ENV} mode`);

const db = knex(knexConfig.development);

const app = express();

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(bodyParser.json());

// Set up CORS options
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Add more methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Add more headers as needed
};
app.use(cors(corsOptions));

// Routes
app.use('/api/pools', poolsRoutes(db));
app.use('/api/donors', donorsRoutes(db));

const PORT = process.env.PORT || 5001;


const { Client } = require('pg'); // Install with `npm install pg`

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log('Connected successfully'))
  .catch(e => console.error('Connection error', e.stack))
  .finally(() => client.end());

app.listen(PORT, () => {
  console.log(process.env.PWD);
  console.log(process.env.NODE_ENV);
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_NAME);
  console.log(`Server running on port ${PORT}`);

});