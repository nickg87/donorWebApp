//routes/files.js
import express from 'express';
import multer from 'multer';
import path from 'path';  // Ensure you import path module
import fs from 'fs';

// Get the current directory for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ASSETS_PREFIX_PATH_STORED_IN_DB = 'public/assets/uploads';

export default (db) => {
  const router = express.Router();

  // Ensure the uploads directory exists
  // Path to the `public` folder in the Next.js frontend app
  const uploadDir = path.join(__dirname, '..', '..', 'public', 'assets', 'uploads');

// Ensure the uploads directory exists in the frontend's public folder
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Configure Multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),  // Define destination folder
    filename: (req, file, cb) => {
      console.log('reaches this statement in storage multer.diskStorage');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const storedFilename = `file-${path.parse(file.originalname).name}-${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, storedFilename);
    }
  });

  // Set up file filter for validation (only .jpeg, .jpg, .png files, under 2MB)
  const fileFilter = (req, file, cb) => {
    console.log('reaches this statement in fileFilter');
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type, only .jpeg, .jpg, .png are allowed'), false);
    }
    if (file.size > 2 * 1024 * 1024) {  // 2MB size limit
      return cb(new Error('File size exceeds 2MB'), false);
    }
    cb(null, true);
  };

  const upload = multer({ storage, fileFilter });

  // Define the upload route
  router.post('/', upload.array('file', 10), async (req, res) => {
    console.log('Request received at /api/upload');
    console.log('Files:', req.files);
    try {
      if (req.files && req.files.length > 0) {

        // Map the files to extract filename and path
        const fileData = req.files.map(file => {
          const filePath = `/assets/uploads/${file.filename}`;
          return {
            filename: file.filename,
            path: filePath
          };
        });
        console.log(fileData);
        // Insert file data into the database


        // Insert each file one by one
        const insertedFileIds = [];

        for (const file of fileData) {
          const [ret] = await db('files').insert(file).returning('id');  // Insert one file at a time
          console.log('Insert result for one file:', ret);  // Log the result to inspect the format
          insertedFileIds.push(ret.id);  // Store the inserted ID
        }

        // Respond with the file paths and the IDs of the inserted records
        res.status(201).json({
          success: true,
          files: fileData,  // This will return the filenames and paths
          insertedFileIds: insertedFileIds  // Assuming you want to return the inserted file IDs
        });

      } else {
        return res.status(400).json({ error: 'No files uploaded' });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  });

  // Define the GET test route
  router.get('/', async (req, res) => {
    try {
      const files = await db('files').select('*');
      res.json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ error: 'Failed to fetch files' });
    }
  });
  return router;
};
