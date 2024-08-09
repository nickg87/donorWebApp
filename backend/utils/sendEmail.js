// src/utils/sendEmail.js
const nodemailer = require('nodemailer');

async function sendEmail({ fromName, fromEmail, toEmail, subject, message }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      replyTo: fromEmail,
      to: toEmail,
      subject: subject,
      text: message,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Error sending email' };
  }
}

module.exports = sendEmail;
