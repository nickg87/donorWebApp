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

// Get verify file by GET filename
router.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join('public/lists', fileName);
  try {
    const emails = await readEmailsFromCSV(filePath);
    const totalEmails = emails.length;
    const validEmails = [];
    const invalidEmails = [];

    let currentEmailIndex = 0;
    res.setHeader('Content-Type', 'text/plain');  // Set response type for streaming

    for (const email of emails) {
      try {
        // Add a delay before each check
        await delay(1500);  // 1.5 seconds delay

        const result = await verifyEmail(email);
        if (result.valid) {
          validEmails.push(result.email);
        } else {
          invalidEmails.push(email);
        }

        // Send progress update (percentage) to client
        currentEmailIndex++;
        const progress = Math.floor((currentEmailIndex / totalEmails) * 100);
        res.write(`Progress: ${progress}%\n`);  // Sends progress data to client
      } catch (error) {
        console.error(`Verification failed for ${email}: ${error.message}`);
        invalidEmails.push(email);
      }
    }

    res.end();  // End the response after processing all emails
    res.json({ validEmails, total: validEmails.length, invalidEmails, totalInvalid: invalidEmails.length });
  } catch (error) {
    res.status(500).json({ message: 'Error processing emails', error: error.message });
  }
});


export default router;