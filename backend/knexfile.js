require('dotenv').config();
let envPath = process.env.PWD  + '/backend';
envPath = envPath.replace('/backend/backend', '/backend');
require('dotenv-flow').config({
  path: envPath, // This should point to where your .env files are
  node_env: process.env.NODE_ENV || 'development', // Use NODE_ENV to pick the right .env file
});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
    debug: process.env.KNEX_DEBUG_MODE === 'true',
  },
  staging: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
    debug: process.env.KNEX_DEBUG_MODE === 'true',
  },
};
