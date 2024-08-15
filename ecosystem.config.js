module.exports = {
  apps: [
    {
      name: 'donor-hub',                  // Production app
      script: './server.js',             // Path to your main server script
      instances: 1,                      // Number of instances
      env: {
        NODE_ENV: 'production',          // Production environment variables
        PORT: 3000                        // Production port
      }
    },
    {
      name: 'backend',                   // Production backend app
      script: './backend/server.js',     // Path to your Express server script
      instances: 1,                      // Number of instances
      env: {
        NODE_ENV: 'production',          // Production environment variables
        PORT: 5000                        // Production port for backend
      }
    },
    {
      name: 'stage-donor-hub',            // Staging app
      script: './stage/server.js',       // Path to your staging main server script
      instances: 1,                      // Number of instances
      env_staging: {
        NODE_ENV: 'staging',             // Staging environment variables
        PORT: 3001                        // Staging port
      }
    },
    {
      name: 'stage-backend',             // Staging backend app
      script: './stage/backend/server.js', // Path to your staging Express server script
      instances: 1,                      // Number of instances
      env_staging: {
        NODE_ENV: 'staging',             // Staging environment variables
        PORT: 5001                        // Staging port for backend
      }
    }
  ]
};