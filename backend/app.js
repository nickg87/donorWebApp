const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const poolsRoutes = require('./routes/pools');
const donorsRoutes = require('./routes/donors');

const db = knex(knexConfig.development);
const app = express();

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});