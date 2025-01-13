// backend/routes/emailSender.js
import express from 'express';
import {sendElasticEmail} from '../utils/emailSender.js';
import axios from "axios"; // Import email sender
const router = express.Router();


router.post('/sendElasticEmail', async (req, res) => {
  const { email, subject } = req.body;
  let toEmail = email;

  if (!email) {
    return res.status(400).send({ error: 'No email provided' });
  }

  if (email === 'master') {
    toEmail = process.env.APP_EMAIL;
  }

  console.log('toEmail');
  console.log(toEmail);

  let htmlTemplate = '';

  // 1. Fetch the HTML template
  try {
    const response = await axios.get((process.env.TEMPLATE_URL || 'https://luckyhub.app/templates/') + 'eth_lottery_newsletter.html');
    htmlTemplate = response.data;
  } catch (error) {
    console.error('Error fetching email template:', error.message);
    return res.status(500).send({ error: 'Failed to fetch email template' });
  }

  try {
    await sendElasticEmail(toEmail, subject, htmlTemplate); // Call the helper function
    res.send({
      send: true,
      toEmail,
      error: false
    });

  } catch (error) {
    res.send({
      send: false,
      toEmail,
      error: error
    });

  }
});

export default router;
