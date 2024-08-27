const fs = require('fs');
const path = require('path');

// Path to the .env.local file
const envFilePath = path.join(__dirname, '../.env.local');

// Check if the .env.local file exists
if (fs.existsSync(envFilePath)) {
  // Read the existing .env.local file
  let envFileContent = fs.readFileSync(envFilePath, 'utf8');

  // Reset maintenance mode flag
  envFileContent = envFileContent.replace(/MAINTENANCE_MODE=.*/g, 'MAINTENANCE_MODE=false');

  // Write the updated content back to .env.local
  fs.writeFileSync(envFilePath, envFileContent, 'utf8');
}
