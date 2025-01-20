import express from 'express';
import crypto from 'crypto'; // For generating temp_hash
import nodemailer from 'nodemailer'; // For sending emails
const router = express.Router();

export default (db) => {
  // Subscribe route
  router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email provided.' });
    }

    try {
      // Check if email already exists in the users table
      const existingUser = await db('users').select('*').where({ email }).first();
      if (existingUser) {
        if (existingUser.email_verified) {
          return res.status(200).json({ message: 'Email is already subscribed and verified.' });
        } else {
          return res.status(400).json({ message: 'Email is pending verification. Please check your inbox.' });
        }
      }

      // Check if email exists in the buffer table
      const existingBuffer = await db('email_subscriptions').select('*').where({ email }).first();
      if (existingBuffer) {
        return res
          .status(400)
          .json({ message: 'A verification email has already been sent. Please check your inbox.' });
      }

      // Generate a temp_hash
      const tempHash = crypto.randomBytes(20).toString('hex');

      // Insert email and temp_hash into the buffer table
      await db('email_subscriptions').insert({ email, temp_hash: tempHash });

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
          user: 'your-email@gmail.com', // Replace with your email
          pass: 'your-email-password', // Replace with your email password or app-specific password
        },
      });
      const appUrl = process.env.APP_URL;
      const verificationUrl = appUrl + `/emailSubscription/verify?temp_hash=${tempHash}`;
      const mailOptions = {
        from: '"LuckyHub" <your-email@gmail.com>', // Sender email
        to: email,
        subject: 'Verify Your Subscription',
        html: `
          <h1>Verify Your Email</h1>
          <p>Click the link below to verify your subscription:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
        `,
      };

      console.log(mailOptions);

      //await transporter.sendMail(mailOptions);

      console.log(`Verification email sent to ${email}`);
      return res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
    } catch (error) {
      console.error('Error processing subscription:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });


// Verify route
  router.get('/verify', async (req, res) => {
    const { temp_hash } = req.query;

    if (!temp_hash) {
      return res.status(400).json({ error: 'Missing temp_hash in query parameters.' });
    }

    try {
      // Look up the temp_hash in the buffer table
      const bufferEntry = await db('email_subscriptions').select('*').where({ temp_hash }).first();

      if (!bufferEntry) {
        return res.status(404).json({ error: 'Invalid or expired verification link.' });
      }

      const { email } = bufferEntry;

      // Move the email to the users table
      await db.transaction(async (trx) => {
        const tempPassHash = crypto.randomBytes(20).toString('hex');
        await trx('users').insert({ email, email_verified: true, name:email, password_hash: tempPassHash }); // Adjust this based on your schema
        await trx('email_subscriptions').where({ temp_hash }).del(); // Remove from the buffer table
      });

      console.log(`Email ${email} verified successfully.`);
      return res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });

  return router;
};

