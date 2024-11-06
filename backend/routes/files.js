import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Define destination folder
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Define the upload route
router.post('/', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({ path: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

export default router;
