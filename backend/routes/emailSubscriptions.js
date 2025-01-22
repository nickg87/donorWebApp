import express from 'express';
import crypto from 'crypto'; // For generating temp_hash
import nodemailer from 'nodemailer'; // For sending emails
const router = express.Router();
import {sendEmail} from '../utils/sendEmail.js';
import {smtpVerifyEmail, verifyEmail} from "../utils/emailVerifier.js";

export default (db) => {
  // Subscribe route
  router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email provided.' });
    }

    try {
      // Verify email via SMTP
      const smtpResult = await verifyEmail(email);
      //const smtpResult = {valid : true};

      if (!smtpResult.valid) {
        return res.status(400).json({
          error: 'invalid_email',
          message: {
            en: `The email address "${email}" is invalid.`,
            es: `La dirección de correo electrónico "${email}" no es válida.`,
          },
        });
      }

      // Check if email already exists in the users table
      const existingUser = await db('users').select('*').where({ email }).first();
      if (existingUser) {
        if (existingUser.email_verified) {
          return res.status(200).json({
            error: 'subscribed',
            message: {
              en: 'Email is already subscribed and verified.',
              es: 'El correo electrónico ya está suscrito y verificado.',
            },
          });
        } else {
          return res.status(200).json({
            error: 'pending',
            message: {
              en: 'Email is pending verification. Please check your inbox.',
              es: 'El correo electrónico está pendiente de verificación. Por favor, compruebe su bandeja de entrada.',
            },
          });
        }
      }

      // Check if email exists in the buffer table
      const existingBuffer = await db('email_subscriptions').select('*').where({ email }).first();
      if (existingBuffer) {
        return res.status(200).json({
          error: 'existing',
          message: {
            en: 'A verification email has already been sent. Please check your inbox.',
            es: 'Ya se ha enviado un correo electrónico de verificación. Compruebe su bandeja de entrada.',
          },
        });
      }

      // Generate a temp_hash
      const tempHash = crypto.randomBytes(20).toString('hex');

      // Insert email and temp_hash into the buffer table
      await db('email_subscriptions').insert({ email, temp_hash: tempHash });

      // Build the verification URL
      const verificationUrl = `${process.env.APP_URL}/request/verifySubscription?temp_hash=${tempHash}`;

      // Prepare email content
      const message = `
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your subscription:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `;

      // Send verification email
      const emailResult = await sendEmail({
        fromName: process.env.APP_NAME,
        fromEmail: process.env.APP_EMAIL,
        toEmail: email,
        subject: `${process.env.APP_NAME}: Verify Your Subscription`,
        message: message,
        asHtml: true,
        useReply: false,
      });

      if (emailResult.success) {
        console.log(`Verification email sent to ${email}`);
        return res.status(200).json({
          error: false,
          message: {
            en: 'Verification email sent. Please check your inbox.',
            es: 'Se ha enviado un correo electrónico de verificación. Por favor, compruebe su bandeja de entrada.',
          },
        });
      } else {
        console.error('Error sending email:', emailResult.error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
    } catch (error) {
      console.log(error);
      console.error('Error processing subscription:', error.message);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });


// Verify route
  router.get('/verify', async (req, res) => {
    const { temp_hash } = req.query;

    if (!temp_hash) {
      return res.status(400).json({
        error: {
          en: 'Missing temp_hash in query parameters.',
          es: 'Falta temp_hash en los parámetros de consulta.'
        }
      });
    }

    try {
      // Look up the temp_hash in the buffer table
      const bufferEntry = await db('email_subscriptions').select('*').where({ temp_hash }).first();

      if (!bufferEntry) {
        return res.status(404).json({
          error: {
            en: 'Invalid or expired verification link.',
            es: 'Enlace de verificación no válido o caducado'
          }
        });
      }

      const { email } = bufferEntry;

      // Move the email to the users table
      await db.transaction(async (trx) => {
        const tempPassHash = crypto.randomBytes(20).toString('hex');
        await trx('users').insert({ email, email_verified: true, name:email, password_hash: tempPassHash }); // Adjust this based on your schema
        await trx('email_subscriptions').where({ temp_hash }).del(); // Remove from the buffer table
      });

      console.log(`Email ${email} verified successfully.`);
      return res.status(200).json({
        message: {
          en: 'Email verified successfully.',
          es: 'Correo electrónico verificado correctamente.'
        }
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });

  return router;
};

