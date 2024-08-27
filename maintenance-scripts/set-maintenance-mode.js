const fs = require('fs');
const path = require('path');

// Path to the .env.local file
const envFilePath = path.join(__dirname, '../.env.local');

// Check if the .env.local file exists
if (fs.existsSync(envFilePath)) {
  // Read the existing .env.local file
  let envFileContent = fs.readFileSync(envFilePath, 'utf8');

  // Set maintenance mode flag
  envFileContent = envFileContent.replace(/NEXT_PUBLIC_MAINTENANCE_MODE=.*/g, 'NEXT_PUBLIC_MAINTENANCE_MODE=true');

  // Write the updated content back to .env.local
  fs.writeFileSync(envFilePath, envFileContent, 'utf8');
} else {
  // Create .env.local if it doesn't exist
  fs.writeFileSync(envFilePath, 'NEXT_PUBLIC_MAINTENANCE_MODE=true\n', 'utf8');
}
