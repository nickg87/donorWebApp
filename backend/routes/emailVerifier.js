import express from 'express';
import { smtpVerifyEmail, verifyEmail } from '../utils/emailVerifier.js';
import { readEmailsFromCSV } from '../utils/miscellaneous.js';
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
    const emails = await readEmailsFromCSV(filePath);
    const totalEmails = emails.length;

    // Initialize progress tracking
    progressStore.set(fileName, {
      total: totalEmails,
      completed: 0,
      validEmails: [],
      invalidEmails: [],
      unreachableEmails: [],
    });

    // Trigger asynchronous email processing
    emails.forEach(async (email) => {
      // Add delay to avoid server overloading
      await delay(500); // e.g., 0.5s delay per email

      // Trigger a separate route to process the email
      try {
        const result = await fetch(`http://localhost:5000/api/emailVerifier/verify/${encodeURIComponent(email)}`);
        const { valid, email: verifiedEmail } = await result.json();

        const progress = progressStore.get(fileName);
        if (valid) {
          progress.validEmails.push(verifiedEmail);
        } else {
          progress.invalidEmails.push(verifiedEmail);
        }
        progress.completed++;
        progressStore.set(fileName, progress);
      } catch (error) {
        const progress = progressStore.get(fileName);
        progress.unreachableEmails.push(email);
        progress.completed++;
        progressStore.set(fileName, progress);
      }
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
