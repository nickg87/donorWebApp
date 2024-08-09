import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST, // Replace with your SMTP server
      port: 465, // Replace with the appropriate port for your SMTP server
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER, // Replace with your SMTP user
        pass: process.env.NEXT_PUBLIC_SMTP_PASS, // Replace with your SMTP password
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: `"${name}" <${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}>`, // sender address
        replyTo: email, // sender address
        to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // replace with your email address
        subject: 'New contact form message',
        text: message,
      });

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
