import nodemailer from 'nodemailer';

export async function sendEmail({ fromName, fromEmail, toEmail, subject, message, asHtml = false }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      replyTo: fromEmail,
      to: toEmail,
      subject: subject,
      [asHtml ? 'html' : 'text']: message, // Use HTML or plain text based on asHtml
    };

    // Debugging log to check the mail options
    // console.log('Sending email with options:', mailOptions);

    await transporter.sendMail(mailOptions);

    // Debugging log to confirm email sent
    // console.log('Email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Error sending email' };
  }
}
