import { config as dotenvConfig } from 'dotenv';
import { config as dotenvFlowConfig } from 'dotenv-flow';

let envPath = process.env.PWD  + '/backend';
envPath = envPath.replace('/backend/backend', '/backend');
envPath = envPath.replace('/backend/backend', '/backend');
console.log(envPath);

dotenvConfig();
dotenvFlowConfig({
  path: envPath,
  node_env: process.env.NODE_ENV || 'development',
});

export default {
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
      directory: envPath + './migrations',
    },
    seeds: {
      directory: envPath + './seeds',
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
      directory: envPath + './migrations',
    },
    seeds: {
      directory: envPath + './seeds',
    },
    debug: process.env.KNEX_DEBUG_MODE === 'true',
  },
};
