module.exports = {
  apps: [
    // Production Next.js app
    {
      name: 'donor-hub',                  // Production app
      script: 'npm',                      // Use npm to start the app
      args: 'start',                     // Start the app using 'npm start'
      cwd: './',                         // Working directory for production app
      instances: 1,
      env: {
        NODE_ENV: 'production',          // Production environment variables
        PORT: 3000                        // Production port
      }
    },
    // Production Express backend
    {
      name: 'backend',                   // Production backend app
      script: 'npm',                     // Use npm to start the backend
      args: 'run dev',                 // Start the backend using 'npm run start' (or appropriate command)
      cwd: './backend',                 // Path to your Express server script
      instances: 1,
      env: {
        NODE_ENV: 'production',          // Production environment variables
        PORT: 5000                        // Production port for backend
      }
    },
    // Staging Next.js app
    // {
    //   name: 'stage-donor-hub',            // Staging app
    //   script: 'npm',                      // Use npm to start the staging app
    //   args: 'start',                     // Start the app using 'npm start'
    //   cwd: './stage',                    // Working directory for staging app
    //   instances: 1,
    //   env_staging: {
    //     NODE_ENV: 'staging',             // Staging environment variables
    //     PORT: 3001                        // Staging port
    //   }
    // },
    // // Staging Express backend
    // {
    //   name: 'stage-backend',             // Staging backend app
    //   script: './stage/backend/index.mjs', // Path to your staging Express server script
    //   instances: 1,
    //   env_staging: {
    //     NODE_ENV: 'staging',             // Staging environment variables
    //     PORT: 5001                        // Staging port for backend
    //   }
    // }
  ]
};
