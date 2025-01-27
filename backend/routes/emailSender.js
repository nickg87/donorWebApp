// backend/routes/emailSender.js
import express from 'express';
import {sendElasticEmail} from '../utils/emailSender.js';
import axios from "axios";
import crypto from "crypto"; // Import email sender
const router = express.Router();

export default (db) => {
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


    // Check if user exists and if they are unsubscribed
    const checkUsersTableForEntry = await db('users').select('*').where('email', toEmail).first();
    if (checkUsersTableForEntry) {
      if (checkUsersTableForEntry.is_subscribed === false) {
        return res.send({
          send: false,
          toEmail,
          error: `Email ${toEmail} has unsubscribed!`
        });
      }
    }

  try {
    await sendElasticEmail(toEmail, subject, htmlTemplate); // Call the helper function

    // If email sent successfully, proceed to insert into the database
    const tempPassHash = crypto.randomBytes(20).toString('hex');
    db.transaction(async (trx) => {
      try {
        await trx('users').insert({
          email: toEmail,
          email_verified: true,
          is_subscribed: true,
          name: toEmail,
          password_hash: tempPassHash, // Generate temporary password hash
        });
        console.log(`Successfully inserted ${toEmail} into users table.`);
      } catch (dbError) {
        console.error('Error inserting into users table:', dbError.message);
      }
    });

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


  return router;
}
