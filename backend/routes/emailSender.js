// backend/routes/emailSender.js
import express from 'express';
import {sendEmail} from '../utils/emailSender.js'; // Import email sender
const router = express.Router();

router.post('/sendEmails', async (req, res) => {
  const { emails, subject, body } = req.body;

  if (!emails || emails.length === 0) {
    return res.status(400).send({ error: 'No emails provided' });
  }

  let successful = 0;
  let failed = 0;

  // Send emails in a throttled manner (1 per second)
  for (let i = 0; i < emails.length; i++) {
    try {
      await sendEmail(emails[i], subject, body);
      successful++;
    } catch (error) {
      failed++;
    }
    // Throttle the emails (1 email per second)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  res.send({
    success: successful,
    failed: failed,
    total: emails.length,
  });
});

export default router;
