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

const retryLimit = 1; // Set the number of retry attempts

// Function to check if an email exists using the email-existence library
export const verifyEmail = (email) => {
  let check = new Promise((resolve, reject) => {
    const timeoutV = setTimeout(() => {
      // Reject on timeout
      reject({ valid: false, email, error: 'Timeout reached verifyEmail after 1000ms' });
    }, 1000); // Timeout after 1 second

    emailExistence.check(email, (err, res) => {
      clearTimeout(timeoutV); // Clear timeout after getting a response
      if (err || !res) {
        // Reject if there's an error or the response indicates the email is invalid
        const errorMessage = err ? err.message : 'Email not valid';
        reject({ valid: false, email, error: errorMessage });
      } else {
        // Resolve if the email is valid
        resolve({ valid: true, email, method: 'emailExistence' });
      }
    });
  });
  // console.log('check');
  // console.log(check);
  return check;
};


export const smtpVerifyEmail = async (email) => {

  const [user, domain] = email.split('@');
  const retries = retryLimit;

  return new Promise((resolve, reject) => {
    const timeoutS = setTimeout(() => {
      // Reject on timeout
      reject({ valid: false, email, error: 'Timeout reached smtpVerifyEmail after 1000ms' });
    }, 1000); // Timeout after 1 second

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
            clearTimeout(timeoutS);
            resolve({ valid: true, email, method: 'smtpVerifyEmail' });
          } else {
            clearTimeout(timeoutS);
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
  // console.log('response.data in isValidEmailFromMailsSo');
  // console.log(response.data);
  let returnedResult = false;
  if (!response || !response.data) {
    returnedResult = { valid: false, error: 'Invalid response from API' };
    //console.log(returnedResult);
    return returnedResult;
  }

  const { result, reason, score, isv_format, isv_domain, isv_mx } = response.data;

  // Check primary validity indicators
  if (result === 'deliverable') {
    returnedResult = { valid: true, reason: 'Email is deliverable' };
    //console.log(returnedResult);
    return returnedResult;
  }

  // Handle undeliverable emails
  if (result === 'undeliverable') {
    returnedResult = { valid: false, reason: reason || 'Email is undeliverable' };
    //console.log(returnedResult);
    return returnedResult;
  }

  // If result is unknown, decide based on other fields
  if (result === 'unknown') {
    if (!isv_format) {
      returnedResult = { valid: false, reason: 'Invalid email format' };
      //console.log(returnedResult);
      return returnedResult;
    }
    if (!isv_domain) {
      returnedResult = { valid: false, reason: 'Invalid domain' };
      //console.log(returnedResult);
      return returnedResult;
    }
    if (!isv_mx) {
      returnedResult = { valid: false, reason: 'No MX record for domain' };
      //console.log(returnedResult);
      return returnedResult;
    }
    if (score < 50) {
      returnedResult = { valid: false, reason: 'Low confidence score' };
      //console.log(returnedResult);
      return returnedResult;
    }
    returnedResult = { valid: false, reason: reason || 'Unknown result (possibly invalid)' };
    //console.log(returnedResult);
    return returnedResult;
  }

  returnedResult = { valid: false, reason: 'Unhandled case in email validation' };
  //console.log(returnedResult);
  return returnedResult;
};

const mailsSoValidation = (email) => {
  return new Promise((resolve, reject) => {
    const apiKey = 'fbfb6887-1217-4ecc-990f-83c63fba5c0f';
    fetch(`https://api.mails.so/v1/validate?email=${email}`, {
      method: 'GET',
      headers: {
        'x-mails-api-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const validation = isValidEmailFromMailsSo(data); // Assuming this is your custom validation logic
        if (validation.valid) {
          resolve({ valid: true, email, method: 'mails.so' });
        } else {
          reject({ valid: false, email, error: validation.reason });
        }
      })
      .catch((apiError) => {
        reject({ valid: false, email, error: `mails.so error: ${apiError.message}` });
      });
  });
};

// Combined email verification with fallback
export const verifyAndFallbackEmail = (email) => {
  return new Promise((resolve, reject) => {
    // Create a timeout for the entire operation
    const timeout = setTimeout(() => {
      reject({ valid: false, email, error: 'Timeout reached' });
    }, 5000); // Timeout for 3 seconds (adjust as needed)

    // Start by using verifyEmail
    verifyEmail(email)
      .then((result) => {
        console.log('verifyEmail succeeded:', result);
        clearTimeout(timeout);
        resolve(result);
      })
      .catch((error) => {
        //console.warn(`verifyEmail failed for ${email}:`, error);
        // If verifyEmail fails, try the SMTP fallback
        //console.warn(`Primary verification failed for ${email}. Falling back to SMTP verification.`);
        smtpVerifyEmail(email)
          .then((smtpResult) => {
            //console.log('smtpResult');
            //console.log(smtpResult);
            if (smtpResult.valid) {
              console.log('reaches this point!');
              clearTimeout(timeout); // Clear the timeout if smtpVerifyEmail succeeds
              resolve({ valid: true, email, method: 'smtpVerifyEmail' }); // Resolve as valid if SMTP check passes
            }
          })
          .catch((smtpError) => {
            //console.warn(`SMTP verification failed for ${email}:`, smtpError);
            // Fallback to mails.so as the last step
            mailsSoValidation(email)
              .then((result) => {
                clearTimeout(timeout); // Clear the timeout if mails.so succeeds
                resolve(result);
              })
              .catch((mailsError) => {
                clearTimeout(timeout); // Clear the timeout if everything fails
                reject(mailsError);
              });
          });
      });
  });
};
