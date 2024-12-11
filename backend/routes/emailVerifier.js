import express from 'express';
import { smtpVerifyEmail, verifyEmail } from '../utils/emailVerifier.js';
//import { readEmailsFromCSV } from '../utils/miscellaneous.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory store for progress
const progressStore = new Map(); // { fileName: { total, completed, validEmails, invalidEmails, unreachableEmails } }

// 1. Route to start email processing
router.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join('public/lists', fileName);

  try {
    //const emails = await readEmailsFromCSV(filePath);
    const emails = [];
    const totalEmails = emails.length;

    // Initialize progress tracking
    progressStore.set(fileName, {
      total: totalEmails,
      completed: 0,
      validEmails: [],
      invalidEmails: [],
      unreachableEmails: [],
    });

    res.json({ message: 'Email verification started', total: totalEmails });
  } catch (error) {
    res.status(500).json({ message: 'Error reading file', error: error.message });
  }
});

// 2. Route to verify individual emails
router.get('/verify/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await verifyEmail(email); // Assumes verifyEmail returns a promise
    res.json({ valid: result.valid, email });
  } catch (error) {
    res.status(500).json({ valid: false, email, error: error.message });
  }
});

// 3. Route to get progress
router.get('/progress/:fileName', (req, res) => {
  const { fileName } = req.params;

  if (!progressStore.has(fileName)) {
    return res.status(404).json({ message: 'File not found or processing not started' });
  }

  const progress = progressStore.get(fileName);
  res.json({
    total: progress.total,
    completed: progress.completed,
    validEmails: progress.validEmails.length,
    invalidEmails: progress.invalidEmails.length,
    unreachableEmails: progress.unreachableEmails.length,
  });
});

export default router;
