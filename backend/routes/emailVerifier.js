import express from 'express';
import { smtpVerifyEmail, verifyEmail, verifyAndFallbackEmail } from '../utils/emailVerifier.js';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'; // Use this for reading CSV files
import { createObjectCsvWriter } from 'csv-writer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 1. Route to read the email file and return the email list
router.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '../public/lists', fileName);

  try {
    const emails = await readEmailsFromFile(filePath);
    if (!emails.length) {
      return res.status(404).json({ message: 'No emails found in the file.' });
    }
    res.json({ emails });
  } catch (error) {
    res.status(500).json({ message: 'Error reading file', error: error.message });
  }
});

// Route to read the email valid file and return the email valid list
router.get('/fetchValidEmailList/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '../public/lists/valid', `${fileName.replace('.csv', '')}_valid.csv`);

  try {
    const emails = await readEmailsFromFile(filePath);
    if (!emails.length) {
      return res.status(404).json({ message: 'No emails found in the file.' });
    }
    res.json({ emails });
  } catch (error) {
    res.status(500).json({ message: 'Error reading file', error: error.message });
  }
});

const checkValidFileExists = (fileName) => {
  const validFilePath = path.join(__dirname, '../public/lists/valid', `${fileName.replace('.csv', '')}_valid.csv`);
  return fs.existsSync(validFilePath);  // returns true if the file exists
};

router.post('/checkValidFile', (req, res) => {
  const { fileName } = req.body;
  const fileExists = checkValidFileExists(fileName);

  if (fileExists) {
    res.status(200).json({ fileExists: true });
  } else {
    res.status(200).json({ fileExists: false });
  }
});

// Utility function to read emails from a file (CSV support)
async function readEmailsFromFile(filePath) {
  const emails = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv()) // Parse CSV rows
      .on('data', (row) => {
        if (row.email) emails.push(row.email); // Assuming the CSV has an "email" column
      })
      .on('end', () => resolve(emails))
      .on('error', (err) => reject(err));
  });
}

// 2. Route to verify individual emails
router.get('/verify/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await verifyAndFallbackEmail(email); // Calls the verifyAndFallbackEmail function
    // console.log('result of verifyAndFallbackEmail in routes:');
    // console.log(result);
    res.json(result); // Return valid email result
  } catch (error) {
    //console.warn(`routes: Error verifying email ${email}:`, error); // Log error for debugging
    // Even on failure, return a 200 with a structured response
    res.status(200).json(error);
  }
});


// Route to write valid emails to a CSV file
router.post('/writeValidEmails', async (req, res) => {
  const { fileName, validEmails } = req.body;

  if (!validEmails || validEmails.length === 0) {
    return res.status(400).json({ message: 'No valid emails to write' });
  }

  //const outputFilePath = path.join('../public/lists/valid', `${fileName.replace('.csv', '')}_valid.csv`);
  const outputFilePath = path.join(__dirname, '../public/lists/valid', `${fileName.replace('.csv', '')}_valid.csv`);

  console.log('outputFilePath');
  console.log(outputFilePath);

  // Setup CSV Writer
  const csvWriter = createObjectCsvWriter({
    path: outputFilePath,
    header: [
      { id: 'email', title: 'email' },  // Assuming each email is just a string
    ],
  });

  const records = validEmails.map(email => ({ email }));

  try {
    await csvWriter.writeRecords(records);  // Writing the valid emails to the CSV

   res.json({
      message: 'CSV file written successfully',
      filePath: outputFilePath,
      notification: {
        message: 'CSV file was successfully written!',
        type: 'success', // Can be 'success', 'error', or 'info'
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to write the CSV file',
      notification: {
        message: `Error: ${error.message}`,
        type: 'error',
      },
    });
  }
});


export default router;
