// backend/utils/emailSender.js
import axios from "axios"; // Import email sender


export const sendElasticEmail = async (recipient, subject, content) => {
  const emailPayload = {
    Recipients: [{ Email: recipient }],
    Content: {
      Body: [
        {
          ContentType: 'HTML',
          Content: content,
        }
      ],
      Subject: subject,
      From: process.env.ELASTIC_USER
    }
  };

  try {
    const response = await axios.post(
      'https://api.elasticemail.com/v4/emails',
      emailPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-ElasticEmail-ApiKey': process.env.ELASTIC_APIKEY,
        }
      }
    );
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
  }
};
