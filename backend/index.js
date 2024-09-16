const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const poolsRoutes = require('./routes/pools');
const transactionsRoutes = require('./routes/transactions');
const authRouter = require('./routes/auths'); // Import authentication routes
const path = require('path');
const emailsRouter = require('./routes/emails');
const etherScanRouter = require('./routes/etherscan');

// Import other dependencies
const { startCronJobs } = require('./cronJobs'); // Import cron jobs logic
const { startWebSocketServer } = require('./webSocket'); // Import WebSocket logic

require('dotenv').config();
let envPath = process.env.PWD + '/backend';
envPath = envPath.replace('/backend/backend', '/backend');
require('dotenv-flow').config({
  path: envPath, // This should point to where your .env files are
  node_env: process.env.NODE_ENV || 'development', // Use NODE_ENV to pick the right .env file
});
console.log(`Running in ${process.env.NODE_ENV} mode`);

const db = knex(knexConfig.development);

// Initialize Sequelize
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Database synchronization error:', err));

// Initialize AdminJS using dynamic import
(async () => {
  const { default: AdminJS } = await import('adminjs');
  const { default: AdminJSExpress } = await import('@adminjs/express');
  const { Database, Resource } = await import('@adminjs/sequelize');

  AdminJS.registerAdapter({ Database, Resource });

  // Import model and initialize AdminJS with the model
  const poolModel = require('./models/pools');
  const transactionModel = require('./models/transactions');
  const Pool = poolModel(sequelize, Sequelize.DataTypes);
  const Transaction = transactionModel(sequelize, Sequelize.DataTypes);

  const adminJS = new AdminJS({
    resources: [
      { resource: Pool, options: { navigation: { name: 'Resources' } } },
      {
        resource: Transaction,
        options: {
          listProperties: ['id', 'blockHash', 'blockNumber', 'from', 'gas', 'gasPrice', 'gasUsed', 'hash', 'timeStamp', 'to', 'txreceipt_status', 'value', 'createdAt', 'poolId'],
          filterProperties: ['id', 'from', 'to', 'poolId'],
          sort: {
            direction: 'desc',
            sortBy: 'id',
          },
          navigation: { name: 'Resources' }
        },
      },
      // Add other models as needed
    ],
    rootPath: '/admin',
    branding: {
      companyName: process.env.APP_NAME,
      softwareBrothers: false,
      logo: process.env.APP_URL + '/logos/donorLogoBlack.svg',
      admin: {
        title: 'Resources',
      },
    },
    // Explicitly set locale
    locale: {
      language: 'en',
      availableLanguages: ['en'],
      localeDetection: false,
      withBackend: false,
      translations: {
        en: {
          labels: {
            pools: 'Pools',
            Resources: 'Resources',
            transactions: 'Transactions',
            active: {
              true: 'Yes',
              false: 'No'
            }
          },
          properties: {
            title: 'Title',
            id: 'ID',
            updatedAt: 'Updated At',
            createdAt: 'Created At',
            entry_amount: 'Entry Amount',
            prize_amount: 'Prize Amount',
            eth_address: 'Eth Address',
            type: 'Type',
            description: 'Description',
            active: 'Active',
            blockHash: 'Block Hash',
            blockNumber: 'Block Number',
            gas: 'Gas',
            gasPrice: 'Gas Price',
            gasUsed: 'Gas Used',
            hash: 'Hash',
            timeStamp: 'Time Stamp',
            txreceipt_status: 'Txreceipt Status',
            value: 'Value',
            poolId: 'Pool Id'
          },
        },
      },
    }
  });

  const adminRouter = AdminJSExpress.buildRouter(adminJS);

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
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], // Add more methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Add more headers as needed
  };
  app.use(cors(corsOptions));

  // Routes
  app.use('/api/pools', poolsRoutes(db));
  app.use('/api/transactions', transactionsRoutes(db));
  app.use('/api/emails', emailsRouter);
  app.use('/api/etherscan', etherScanRouter);
  app.use('/api/auth', authRouter(db)); // Correctly use authentication routes

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Add AdminJS router to your Express app
  app.use(adminJS.options.rootPath, adminRouter);

  const PORT = process.env.PORT || 5000;
  const KNEX_DEBUG_MODE = process.env.KNEX_DEBUG_MODE || false;

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

  const server = app.listen(PORT, () => {
    console.log(process.env.PWD);
    console.log(process.env.NODE_ENV);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_NAME);
    console.log(`Server running on port ${PORT}`);
    console.log(`Knex Debug Mode: ${KNEX_DEBUG_MODE}`);
  });

  // Start WebSocket server
  startWebSocketServer(server);

  // Start cron jobs
  startCronJobs();
})();
