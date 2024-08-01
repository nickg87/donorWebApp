require('dotenv').config();
require('dotenv-flow').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST_STAGING,
      port: process.env.DB_PORT_STAGING,
      user: process.env.DB_USER_STAGING,
      password: process.env.DB_PASSWORD_STAGING,
      database: process.env.DB_NAME_STAGING,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
    debug: true,
  },
};
