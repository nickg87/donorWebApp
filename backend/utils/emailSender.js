// backend/utils/emailSender.js
import nodemailer from 'nodemailer';

// Create a transporter using Elastic Email SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.ELASTIC_SERVER,
  port: 2525,
  auth: {
    user: process.env.ELASTIC_USER,
    pass: process.env.ELASTIC_PASS,
  },
});

export const sendEmail = async (toEmail, subject, text) => {
  const mailOptions = {
    from: process.env.ELASTIC_USER, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${toEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${toEmail}: ${error.message}`);
  }
};

