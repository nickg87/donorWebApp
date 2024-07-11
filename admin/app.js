// admin/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const app = express();

app.use(bodyParser.json());

// Set up CORS options
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST'], // Add more methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Add more headers as needed
};
app.use(cors(corsOptions));


// Routes

app.get('/', (req, res) => {
  res.send('Welcome to your Express server'); // Replace with your own message or logic
});

app.get('/cacat', (req, res) => {
  console.log('Received request to /cacat');
  res.send('Welcome to cacat Express server');
});


app.get('/api/pools', async (req, res) => {
  console.log('Received request to /api/pools');
  try {
    const pools = await knex('pools').select('*');
    res.json(pools);
  } catch (error) {
    console.error('Error fetching pools:', error);
    res.status(500).json({ error: 'Failed to fetch pools' });
  }
});
//
// app.get('/api/donors', async (req, res) => {
//   try {
//     const donors = await knex('donors').select('*');
//     res.json(donors);
//   } catch (error) {
//     console.error('Error fetching donors:', error);
//     res.status(500).json({ error: 'Failed to fetch donors' });
//   }
// });


app.get('/api/pools', async (req, res) => {
  try {
    const pools = await db('pools').select('*');
    res.json(pools);
  } catch (error) {
    console.error('Error fetching pools:', error);
    res.status(500).json({ error: 'Failed to fetch pools' });
  }
});

app.get('/api/donors', async (req, res) => {
  try {
    const donors = await db('donors').select('*');
    res.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});


// Add routes for updating and deleting items similarly

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
