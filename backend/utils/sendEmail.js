import nodemailer from 'nodemailer';

export async function sendEmail({ fromName = process.env.APP_NAME, fromEmail, toEmail, subject, message, asHtml, useReply = false }) {
  try {
    // Create a transporter object using the Gmail SMTP service
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Use Gmail's SMTP service
      auth: {
        user: process.env.SMTP_USER,  // Your Gmail email address
        pass: process.env.SMTP_PASS,  // Your Gmail password or App Password
      },
    });

    // Email options
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      replyTo: useReply ? process.env.APP_EMAIL : fromEmail,
      to: toEmail,
      subject: subject,
      [asHtml ? 'html' : 'text']: message, // Use HTML or plain text based on asHtml
    };
    //console.log(mailOptions);

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

//old way
// export async function sendEmail({ fromName, fromEmail, toEmail, subject, message, asHtml = false }) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: 465,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
//
//   try {
//     const mailOptions = {
//       from: `"${fromName}" <${fromEmail}>`,
//       replyTo: fromEmail,
//       to: toEmail,
//       subject: subject,
//       [asHtml ? 'html' : 'text']: message, // Use HTML or plain text based on asHtml
//     };
//
//     // Debugging log to check the mail options
//     // console.log('Sending email with options:', mailOptions);
//
//     await transporter.sendMail(mailOptions);
//
//     // Debugging log to confirm email sent
//     // console.log('Email sent successfully');
//     return { success: true };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return { success: false, error: 'Error sending email' };
//   }
// }
