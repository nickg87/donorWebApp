// Import other modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as dotenvConfig } from 'dotenv';
import { config as dotenvFlowConfig } from 'dotenv-flow';
import knexModule from 'knex';
import knexConfig from './knexfile.mjs';
// Import AdminJS setup
import { setupAdminJS } from './adminJsSetup.mjs';

let envPath = process.env.PWD;
envPath = envPath.replace('/backend/backend', '/backend');

// Setup environment variables
dotenvConfig();
dotenvFlowConfig({
  path: path.resolve(envPath),
  node_env: process.env.NODE_ENV || 'development',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Initialize knex
const knex = knexModule.default(knexConfig.development);

// Import and setup Sequelize
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Database synchronization error:', err));

// Dynamically import routes
const poolsRoutes = (await import('./routes/pools.js')).default;
const transactionsRoutes = (await import('./routes/transactions.js')).default;
const emailsRouter = (await import('./routes/emails.js')).default;
const etherScanRouter = (await import('./routes/etherscan.js')).default;
const authRouter = (await import('./routes/auths.js')).default;

// Set up routes
app.use('/api/pools', poolsRoutes(knex));
app.use('/api/transactions', transactionsRoutes(knex));
app.use('/api/emails', emailsRouter);
app.use('/api/etherscan', etherScanRouter);
app.use('/api/auth', authRouter(knex));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback for favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicons/favicon_be.ico'));
});

// Setup AdminJS
const adminRouter = await setupAdminJS();
app.use('/admin', adminRouter);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import and start WebSocket server
import { startWebSocketServer } from './webSocket.js';
startWebSocketServer(server).then();

// Import and start cron jobs
import { startCronJobs } from './cronJobs.js';
startCronJobs();
