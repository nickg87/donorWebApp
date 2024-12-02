import { sendEmail } from './sendEmail.js';

export const sendNewTransactionEmail = async (txAddress, pool) => {
  try {
    await sendEmail({
      fromName: process.env.APP_NAME,
      fromEmail: process.env.EMAIL_ADDRESS,
      toEmail: process.env.EMAIL_ADDRESS,
      subject: process.env.APP_NAME + `: New transaction in pool ${pool.id}`,
      message: `New transaction from ${txAddress} for pool ${pool.id}.`,
      asHtml: true,
    });
  } catch (error) {
    console.error('Failed to send transaction email:', error);
  }
};