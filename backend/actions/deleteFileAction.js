import path from 'path';
import fs from 'fs';

export const deleteFileAction = {
  name: 'deleteFile',
  before: async (request) => {
    const { record } = request;
    const filePath = record.params.path;  // Assuming the path is stored in DB

    const fileToDelete = path.join(__dirname, '..', 'public', filePath);  // Resolve the file path

    if (fs.existsSync(fileToDelete)) {
      try {
        fs.unlinkSync(fileToDelete); // Delete file from disk
        console.log('File deleted:', fileToDelete);
      } catch (error) {
        console.error('Error deleting file:', error);
        // Optionally, you can add feedback to the user here
      }
    } else {
      console.log('File does not exist:', fileToDelete);
    }

    return request;
  },
  handler: async (request) => {
    const { record } = request;

    await record.delete();  // Delete the record from the database

    return {
      record: null, // Indicate that the record has been deleted
      notice: {
        message: 'File and record deleted successfully!',
        type: 'success',
      },
    };
  },
};
