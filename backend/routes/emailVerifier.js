//backend/routes/emailVerifier.js
import express from 'express';
import { smtpVerifyEmail, verifyEmail } from '../utils/emailVerifier.js';
import { readEmailsFromCSV } from '../utils/miscellaneous.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get verify file by GET filename
router.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;

  const filePath = path.join('public/lists', fileName);
  try {
    const emails = await readEmailsFromCSV(filePath);
    const validEmails = [];
    const invalidEmails = [];

    for (const email of emails) {
      try {
        const result = await verifyEmail(email);
        if (result.valid) { // If valid, push email
          validEmails.push(result.email);  // Push valid emails
        } else {
          invalidEmails.push(email);
        }
      } catch (error) {
        console.error(`Verification failed for ${email}: ${error.message}`);
        invalidEmails.push(email);
      }
    }

    res.json({ validEmails, total: validEmails.length, invalidEmails, totalInvalid: invalidEmails.length });
  } catch (error) {
    res.status(500).json({ message: 'Error processing emails', error: error.message });
  }
});

export default router;