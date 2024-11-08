import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import AdminJS from "adminjs";

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

// Bulk delete action for AdminJS
export const bulkDeleteFileAction = {
  actionType: 'bulk',  // Ensures this is a bulk action
  component: false,
  handler: async (request, response, context) => {
    const { records, currentAdmin, resource, h } = context;
    // Check if any records were selected
    if (!records || records.length === 0) {
      throw new AdminJS.ValidationError({
        message: 'No records selected for deletion.',
      });
    }

    try {
      const deletedRecords = await Promise.all(
        records.map(async (record) => {
          const { path: filePath } = record.params;

          // Delete the file associated with the record
          deleteSingleFile(filePath);

          // // Delete the record from the database
          await record.resource.delete(record.params.id);

          // Return the record as RecordJSON (required by AdminJS)
          return record.toJSON(currentAdmin);
        })
      );

      return {
        notice: {
          message: `${records.length} records successfully deleted.`,
          type: 'success',
        },
        records: deletedRecords,
        //records: [],  // Optional but can be added for consistency
        record: {},  // Adding a dummy record to satisfy redirection logic
        redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }) + '?refresh=true',
      };

    } catch (error) {
      console.error('Error deleting records:', error);
    }
  },
  showInDrawer: false,
};
