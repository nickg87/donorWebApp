// utils/miscellaneous.js

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