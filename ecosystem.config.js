module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'backend/index.js',
      cwd: 'backend',
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development', // Use NODE_ENV from environment or default to 'development'
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};