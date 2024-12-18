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

const retryLimit = 2; // Set the number of retry attempts

// Function to check if an email exists using the email-existence library
export const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    // Create a timeout promise that will reject after 2 seconds
    const timeout = setTimeout(() => {
      reject({ valid: false, email, error: 'Timeout reached' });
    }, 2000); // Timeout after 2 seconds

    emailExistence.check(email, (err, res) => {
      clearTimeout(timeout);
      // console.log(`Checking email: ${email}`);  // Log email being checked
      // console.log('Response from emailExistence:', res);  // Log the result

      // If there's an error, reject with a specific error message
      if (res) {
        // Email is valid, resolve immediately
        resolve({ valid: true, email, method: 'emailExistence' });
      } else {
        // Any other case (error or invalid response), trigger fallback
        const errorMessage = err ? err.message : 'Email not valid';
        reject({ valid: false, email, error: errorMessage });
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
        return resolve({ valid: false, email, error: `No MX record found for domain: ${domain}` });
      }

      const mxRecord = addresses[0].exchange; // Choose the first MX record

      const attemptVerification = async (attemptsLeft) => {
        if (attemptsLeft <= 0) {
          return resolve({ valid: false, email, error: `SMTP verification failed for ${email} after multiple attempts.` });
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

          // Check for valid SMTP response code (250)
          if (response.code === 250) {
            resolve({ valid: true, email, method: 'smtpVerifyEmail' });
          } else {
            // If the code is not 250, consider the email invalid
            resolve({ valid: false, email, error: `Received SMTP response code: ${response.code}` });
          }

          await client.quit();
        } catch (error) {
          console.error(`SMTP attempt failed for ${email}: ${error.message}`);
          await attemptVerification(attemptsLeft - 1); // Retry
        }
      };

      await attemptVerification(retries); // Start with the first attempt
    });
  });
};

const isValidEmailFromMailsSo = (response) => {
  if (!response || !response.data) {
    return { valid: false, error: 'Invalid response from API' };
  }

  const { result, reason, score, isv_format, isv_domain, isv_mx } = response.data;

  // Check primary validity indicators
  if (result === 'deliverable') {
    return { valid: true, reason: 'Email is deliverable' };
  }

  // Handle undeliverable emails
  if (result === 'undeliverable') {
    return { valid: false, reason: reason || 'Email is undeliverable' };
  }

  // If result is unknown, decide based on other fields
  if (result === 'unknown') {
    if (!isv_format) {
      return { valid: false, reason: 'Invalid email format' };
    }
    if (!isv_domain) {
      return { valid: false, reason: 'Invalid domain' };
    }
    if (!isv_mx) {
      return { valid: false, reason: 'No MX record for domain' };
    }
    if (score < 50) {
      return { valid: false, reason: 'Low confidence score' };
    }
    return { valid: false, reason: reason || 'Unknown result (possibly invalid)' };
  }

  return { valid: false, reason: 'Unhandled case in email validation' };
};

// Combined email verification with fallback
export const verifyAndFallbackEmail = (email) => {
  return new Promise((resolve, reject) => {
    // Create a timeout for the entire operation
    const timeout = setTimeout(() => {
      reject({ valid: false, email, error: 'Timeout reached' });
    }, 2000); // Timeout for 2 seconds (adjust as needed)

    // Start by using verifyEmail
    verifyEmail(email)
      .then((result) => {
        clearTimeout(timeout); // Clear the timeout if verifyEmail succeeds
        resolve(result); // If the first method confirms validity, resolve immediately
      })
      .catch((error) => {
        // If verifyEmail fails, try the SMTP fallback
        console.warn(`Primary verification failed for ${email}. Falling back to SMTP verification.`);
        smtpVerifyEmail(email)
          .then((smtpResult) => {
            console.log(smtpResult);
            clearTimeout(timeout); // Clear the timeout if smtpVerifyEmail succeeds
            if (smtpResult.valid) {
              resolve({ valid: true, email, method: 'smtpVerifyEmail' }); // Resolve as valid if SMTP check passes
            } else {
              // Add the mails.so API validation as the final fallback
              const apiKey = 'ad9813a1-85a5-4a9f-af7e-4e2c3fe68a7c';
              fetch(`https://api.mails.so/v1/validate?email=${email}`, {
                method: 'GET',
                headers: {
                  'x-mails-api-key': apiKey,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  const validation = isValidEmailFromMailsSo(data);
                  if (validation.valid) {
                    resolve({ valid: true, email, method: 'mails.so', reason: validation.reason });
                  } else {
                    reject({ valid: false, email, error: validation.reason });
                  }
                })
                .catch((apiError) => {
                  clearTimeout(timeout); // Clear the timeout if mails.so also fails
                  reject({ valid: false, email, error: `mails.so error: ${apiError.message}` });
                });
            }
          })
          .catch((smtpError) => {
            clearTimeout(timeout); // Clear the timeout if fallback also fails
            reject({ valid: false, email, error: smtpError });
          });
      });
  });
};
