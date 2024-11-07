import path, {dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const fileResourceOptions = (Resource, Components, deleteFileAction) => ({
  resource: Resource,
  options: {
    listProperties: ['id', 'filename', 'path', 'uploadedAt'],
    properties: {
      filename: {
        type: 'string',
        isTitle: true,
        isVisible: { list: true, show: true, edit: false },
        components: {
          list: Components.FileThumbnail,
          show: Components.FileShow,
        },
      },
      path: {
        type: 'string',
        isVisible: false,
      },
      file: {
        type: 'file',
        isVisible: { list: false, show: false, edit: true },
        components: {
          edit: Components.FileUploadEdit,
        }
      },
      uploadedAt: {
        isVisible: { list: true, show: false, edit: false }
      },
    },
    navigation: {
      name: 'Assets',
      icon: 'File',
    },
    translations: {
      en: {
        properties: {
          filename: 'Thumbnail',
        }
      }
    },
    actions: {
      delete: {
        isVisible: true,
        before: async (request, params) => {
          const id = params.record.params.id;
          const filePath = params.record.params.path;
          if (!id || !filePath) {
            console.log('Missing ID or path in record params');
            return request;
          }
          const fileToDelete = path.join(__dirname, '..', '..', 'public', filePath);  // Resolve the file path
          console.log('File to delete:', fileToDelete);  // Debugging log for file path
          if (fs.existsSync(fileToDelete)) {
            try {
              fs.unlinkSync(fileToDelete);  // Delete file from disk
              console.log('File deleted:', fileToDelete);
            } catch (error) {
              console.error('Error deleting file:', error);
            }
          } else {
            console.log('File does not exist:', fileToDelete);
          }
          return request;
        }
      }
    }
    // actions: {
    //   delete: {
    //     ...deleteFileAction.action, // Spread the delete file action logic
    //     isVisible: true,  // Optional: make the action visible
    //   },
    // },
  }
});
