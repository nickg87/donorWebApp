import Verifier from 'email-verifier'; // Import Verifier using ES module syntax
import { SMTPClient } from 'smtp-client';
import dns from 'dns';
import emailExistence from 'email-existence';

const verifyOpts = {
  checkCatchAll: false,
  checkDisposable: false,
  checkFree: false,
  validateDNS: false,
  validateSMTP: false
};
const verifier = new Verifier(process.env.WHOISXMLAPI_APIKEY, verifyOpts);

const retryLimit = 3; // Set the number of retry attempts

// Function to check if an email exists using the email-existence library
export const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (err, res) => {
      console.log(`Checking email: ${email}`);  // Log email being checked
      console.log('Response from emailExistence:', res);  // Log the result
      if (err) {
        reject(`Error verifying email ${email}: ${err.message}`);
      } else if (res) {
        resolve({ valid: true, email });
      } else {
        reject(`Invalid email ${email}`);
      }
    });
  });
};

export const emailVerifier = (email) => {
  console.log(process.env.WHOISXMLAPI_APIKEY);
  console.log(verifier);
  return new Promise((resolve, reject) => {
    verifier.verify(email, (err, data) => {
      if (err) {
        reject(`Error verifying email ${email}: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
};


export const smtpVerifyEmail = async (email) => {
  const [user, domain] = email.split('@');
  const retries = retryLimit;

  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, async (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return reject(`No MX record found for domain: ${domain}`);
      }

      const mxRecord = addresses[0].exchange; // Choose the first MX record

      const attemptVerification = async (attemptsLeft) => {
        if (attemptsLeft <= 0) {
          return reject(`SMTP verification failed for ${email} after multiple attempts.`);
        }

        const client = new SMTPClient({
          host: mxRecord,
          port: 587, // Or use port 465 if needed
          secure: false,
        });

        try {
          await client.connect();
          await client.greet({ hostname: 'localhost' });
          await client.mail({ from: 'test@example.com' });
          const response = await client.rcpt({ to: email });

          if (response.code === 250) {
            resolve(true); // Email is valid
          } else {
            resolve(false); // Invalid email
          }

          await client.quit();
        } catch (error) {
          console.error(`SMTP attempt failed for ${email}: ${error.message}`);
          attemptVerification(attemptsLeft - 1); // Retry
        }
      };

      attemptVerification(retries); // Start with the first attempt
    });
  });
};