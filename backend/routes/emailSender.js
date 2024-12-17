// backend/routes/emailSender.js
import express from 'express';
import {sendElasticEmail} from '../utils/emailSender.js';
import axios from "axios"; // Import email sender
const router = express.Router();


router.post('/sendElasticEmail', async (req, res) => {
  const { email, subject } = req.body;

  if (!email) {
    return res.status(400).send({ error: 'No email provided' });
  }

  let htmlTemplate = '';

  // 1. Fetch the HTML template
  try {
    const response = await axios.get((process.env.TEMPLATE_URL || 'https://donorhub.site/templates/') + 'eth_lottery_newsletter.html');
    htmlTemplate = response.data;
  } catch (error) {
    console.error('Error fetching email template:', error.message);
    return res.status(500).send({ error: 'Failed to fetch email template' });
  }

  try {
    await sendElasticEmail(email, subject, htmlTemplate); // Call the helper function
    res.send({
      send: true,
      email,
      error: false
    });

  } catch (error) {
    res.send({
      send: false,
      email,
      error: error
    });

  }
});

export default router;
