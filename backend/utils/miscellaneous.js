// utils/miscellaneous.js
// import fs from 'fs'; // Use ES module syntax
// import csvParser from 'csv-parser';

// Read emails from a CSV file
// export const readEmailsFromCSV = async (filePath) => {
//   const emails = [];
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(filePath)
//       .pipe(csvParser())
//       .on('data', (row) => {
//         if (row.email) emails.push(row.email.trim());
//       })
//       .on('end', () => resolve(emails))
//       .on('error', (err) => reject(err));
//   });
// };

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};
// Utility function to generate a slug from a title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, '');    // Remove leading or trailing dashes
}

// Convert seconds to human-readable format (hours, minutes, seconds)
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let timeString = '';

  if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
  if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  if (remainingSeconds > 0) timeString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;

  return timeString || '0 seconds'; // Return 0 seconds if no time was provided
};

// Fetch the environment variable to check if it's local
export const fetchIsLocal = async () => {
  try {
    const response = await fetch('/api/env');
    const data = await response.json();
    return data.isLocal === 'true';  // Return boolean value based on the server response
  } catch (error) {
    console.error('Error fetching environment variable:', error);
    return false;  // Default to false if there's an error
  }
};