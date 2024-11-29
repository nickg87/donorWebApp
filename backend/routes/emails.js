import express from 'express';
import {sendEmail} from '../utils/sendEmail.js';

const router = express.Router();

// Handler for contact form submissions
router.post('/contact', async (req, res) => {
  const { name, email, message, apiName } = req.body;

  const emailResult = await sendEmail({
    fromName: name,
    fromEmail: email,
    toEmail: process.env.EMAIL_ADDRESS,
    subject: apiName + `: Contact form from ` + name,
    message: message,
    asHtml: true,
    useReply: true,
  });

  if (emailResult.success) {
    return res.status(200).json({ message: 'Contact form email sent successfully' });
  } else {
    return res.status(500).json({ message: emailResult.error });
  }
});

// Handler for feedback form submissions
router.post('/feedback', async (req, res) => {
  const { name, email, message } = req.body;

  const emailResult = await sendEmail({
    fromName: name,
    fromEmail: process.env.EMAIL_ADDRESS,
    toEmail: process.env.FEEDBACK_EMAIL_ADDRESS || process.env.EMAIL_ADDRESS,
    subject: `Contact Form: DonorHub`,
    message: message,
  });

  if (emailResult.success) {
    return res.status(200).json({ message: 'Feedback email sent successfully' });
  } else {
    return res.status(500).json({ message: emailResult.error });
  }
});

// Export the router
export default router;
