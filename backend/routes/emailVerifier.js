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

// Example: Process emails in batches to avoid timeouts
const batchSize = 100; // Process 100 emails at a time

// Route to get the progress (for polling)
router.get('/progress', (req, res) => {
  res.json({ progress: currentProgress });
});

// Get verify file by GET filename
router.get('/:fileName', async (req, res) => {
  // Set a timeout for this specific route
  res.setTimeout(1800000, () => { // 1800000ms = 30 minutes
    console.log('Request timed out!');
    res.status(408).send('Request timed out');
  });

  const { fileName } = req.params;
  const filePath = path.join('public/lists', fileName);
  try {
    const emails = await readEmailsFromCSV(filePath);
    const validEmails = [];
    const invalidEmails = [];
    const unreachableEmails = [];
    const totalEmails = emails.length;

    // Helper function to process each email
    const processEmail = async (email, index) => {
      await delay(1500); // Delay of 1.5 seconds

      try {
        const result = await verifyEmail(email);
        if (result.valid) {
          validEmails.push(result.email);
        } else {
          invalidEmails.push({ email, result });
        }

        // Update progress after processing each email
        currentProgress = Math.round(((index + 1) / totalEmails) * 100);
      } catch (error) {
        console.error(`Verification failed for ${email}: ${error.message}`);
        unreachableEmails.push({ email, error });
        currentProgress = Math.round(((index + 1) / totalEmails) * 100); // Update progress even on error
      }
    };

    const processBatch = async (emails, startIndex) => {
      const endIndex = Math.min(startIndex + batchSize, emails.length);
      const batch = emails.slice(startIndex, endIndex);

      // Process emails concurrently within the batch
      const promises = batch.map((email, index) => processEmail(email, startIndex + index));
      await Promise.all(promises);  // Wait for all promises in the batch to finish
    };

    let currentIndex = 0;

    while (currentIndex < totalEmails) {
      await processBatch(emails, currentIndex);
      currentIndex += batchSize;

      // Optionally, send progress updates to the client
      currentProgress = Math.round((currentIndex / totalEmails) * 100);
      // You could send progress here using a response, WebSocket, or another method
    }

    // Once the process is done, reset progress to 100
    currentProgress = 100;

    res.json({
      validEmails,
      total: validEmails.length,
      invalidEmails,
      totalInvalid: invalidEmails.length ,
      unreachableEmails,
      totalUnreachable: unreachableEmails.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing emails', error: error.message });
  }
});


export default router;