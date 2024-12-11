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

    // Helper function to process each email
    const processEmail = async (email, index) => {
      await delay(1500); // Delay of 1.5 seconds

      try {
        const result = await verifyEmail(email);
        if (result.valid) {
          validEmails.push(result.email);
        } else {
          invalidEmails.push(email);
        }

        // Update progress after processing each email
        currentProgress = Math.round(((index + 1) / totalEmails) * 100);
      } catch (error) {
        console.error(`Verification failed for ${email}: ${error.message}`);
        invalidEmails.push(email);
        currentProgress = Math.round(((index + 1) / totalEmails) * 100); // Update progress even on error
      }
    };

    // Use Promise.all to process emails concurrently with delays
    await Promise.all(emails.map((email, index) => processEmail(email, index)));


    // Once the process is done, reset progress to 100
    currentProgress = 100;

    res.json({ validEmails, total: validEmails.length, invalidEmails, totalInvalid: invalidEmails.length });
  } catch (error) {
    res.status(500).json({ message: 'Error processing emails', error: error.message });
  }
});


export default router;