import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Helper function to delete a single file
const deleteSingleFile = (filePath) => {
  const fileToDelete = path.join(__dirname, '..', '..', 'public', filePath);
  console.log('File to delete:', fileToDelete);

  if (fs.existsSync(fileToDelete)) {
    try {
      fs.unlinkSync(fileToDelete);  // Delete the file
      console.log('CUSTOM ACTION File deleted:', fileToDelete);
    } catch (error) {
      console.error('CUSTOM ACTION Error deleting file:', error);
    }
  } else {
    console.log('CUSTOM ACTION File does not exist:', fileToDelete);
  }
};


// The actual delete action function
export const deleteFileAction = async (request, params) => {
  const id = params.record.params.id;
  const filePath = params.record.params.path;

  if (!id || !filePath) {
    console.log('Missing ID or path in record params');
    return request;
  }
  // Delete a single file
  deleteSingleFile(filePath);

  return request;
};

// The bulk delete action
export const bulkDeleteFileAction = async (request, params) => {

  console.log('request in bulkDeleteFileAction:');
  console.log(request);
  //const { records } = params;  // `records` contains all the records for bulk delete

  // Loop through each record and delete the associated file
  // for (const record of records) {
  //   const filePath = record.params.path;
  //   if (filePath) {
  //     // Delete each file individually
  //     deleteSingleFile(filePath);
  //   } else {
  //     console.log('No file path for record', record.params.id);
  //   }
  // }

  return request;
};
