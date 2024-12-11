//backend/routes/emailVerifier.js
import express from 'express';
import { smtpVerifyEmail, verifyEmail } from '../utils/emailVerifier.js';
import { readEmailsFromCSV } from '../utils/miscellaneous.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Variable to store progress
let currentProgress = 0;

// Route to get the progress (for polling)
router.get('/progress', (req, res) => {
  res.json({ progress: currentProgress });
});

// Get verify file by GET filename
router.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join('public/lists', fileName);
  try {
    const emails = await readEmailsFromCSV(filePath);
    const validEmails = [];
    const invalidEmails = [];
    const totalEmails = emails.length;

    for (let i = 0; i < totalEmails; i++) {
      await delay(1500); // Delay of 2 seconds

      try {
        const result = await verifyEmail(emails[i]);
        if (result.valid) {
          validEmails.push(result.email);
        } else {
          invalidEmails.push(emails[i]);
        }

        // Update progress and store it
        currentProgress = Math.round(((i + 1) / totalEmails) * 100);
      } catch (error) {
        console.error(`Verification failed for ${emails[i]}: ${error.message}`);
        invalidEmails.push(emails[i]);
      }
    }

    // Once the process is done, reset progress to 100
    currentProgress = 100;

    res.json({ validEmails, total: validEmails.length, invalidEmails, totalInvalid: invalidEmails.length });
  } catch (error) {
    res.status(500).json({ message: 'Error processing emails', error: error.message });
  }
});


export default router;