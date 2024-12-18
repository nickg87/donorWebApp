import React, {useEffect, useState} from 'react';
import {Box, Button, Input, Label, Section, Text} from '@adminjs/design-system';
import ProgressBar from './UI/ProgressBar';
import axios from 'axios';
import { addNotification } from 'adminjs';
import {formatTime} from "../utils/miscellaneous.js";

const EmailVerifier = () => {
  const [fileName, setFileName] = useState('test0.csv'); // Store the input filename
  const [emails, setEmails] = useState([]); // Store email list
  const [results, setResults] = useState({
    valid: [],
    invalid: [],
    unreachable: [],
  }); // Store verification results
  const [progress, setProgress] = useState(0); // Track progress
  const [loading, setLoading] = useState(false); // Track loading state
  const [completed, setCompleted] = useState(false); // Mark process as done
  const [error, setError] = useState(''); // Track errors
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(0); // Estimated time left in seconds
  const [totalTimeTaken, setTotalTimeTaken] = useState(null);
  const [startTime, setStartTime] = useState(null); // Time when verification started
  const [validEmails, setValidEmails] = useState([]);
  const [validMethodExistence, setValidMethodExistence] = useState(0);
  const [validMethodSMTP, setValidMethodSMTP] = useState(0);
  const [validMethodMailsSO, setValidMethodMailsSO] = useState(0);
  const [fileExists, setFileExists] = useState(false);
  const [skipValidation, setSkipValidation] = useState(false);


  // Check if the valid file already exists
  const checkValidFile = async (fileName) => {
    try {
      const response = await axios.post('/api/emailVerifier/checkValidFile', { fileName });
      setFileExists(response.data.fileExists);
    } catch (error) {
      console.error('Error checking valid file:', error);
    }
  };

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeSpent = Math.floor((now - startTime) / 1000); // Elapsed time in seconds
        setElapsedTime(timeSpent);

        // Estimate time left based on progress
        const progressRatio = progress / 100;
        if (progressRatio > 0) {
          const estimatedTime = Math.floor((timeSpent / progressRatio) - timeSpent);
          setEstimatedTimeLeft(estimatedTime);
        }
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [startTime, progress]);

  const fetchEmailList = async () => {
    if (!fileName) {
      setError('Please enter a valid filename.');
      return;
    }
    setSkipValidation(false);
    await checkValidFile(fileName);

    setError(''); // Clear any previous errors
    setValidEmails([]);
    setValidMethodExistence(0);
    setValidMethodSMTP(0);
    setValidMethodMailsSO(0);
    setEmails([]);
    setResults({ valid: [], invalid: [], unreachable: [] });
    setProgress(0);
    setCompleted(false);

    try {
      const response = await axios.get(`/api/emailVerifier/${fileName}`);
      if (response.data?.emails?.length > 0) {
        setEmails(response.data.emails); // Assuming API returns { emails: [...] }
      } else {
        setError('No emails found in the file.');
      }
    } catch (err) {
      setError(`Error fetching email list: ${err.message}`);
    }
  };

  const fetchValidEmailList = async () => {

    setError(''); // Clear any previous errors
    setValidEmails([]);
    setCompleted(false);
    setSkipValidation(true);

    try {
      const response = await axios.get(`/api/emailVerifier/fetchValidEmailList/${fileName}`);
      if (response.data?.emails?.length > 0) {
        setValidEmails(response.data.emails); // Assuming API returns { emails: [...] }
        setCompleted(true);
      } else {
        setError('No emails found in the file.');
      }
    } catch (err) {
      setError(`Error fetching email list: ${err.message}`);
    }
  };

  const verifyEmails = async () => {
    let currTime = Date.now();
    setStartTime(currTime);
    setLoading(true);
    const totalEmails = emails.length;
    const newResults = { valid: [], invalid: [], unreachable: [] };

    for (let i = 0; i < totalEmails; i++) {
      const email = emails[i];
      try {
        const response = await axios.get(`/api/emailVerifier/verify/${email}`);
        // console.log(`response.data from api/emailVerifier/verify/${email}`);
        // console.log(response.data);
        const { valid, method } = response.data;

        if (valid) {
          newResults.valid.push(email);
          validEmails.push(email);

          if (method === 'emailExistence') {
            setValidMethodExistence((prev) => prev + 1);
          } else if (method === 'mails.so') {
            setValidMethodMailsSO((prev) => prev + 1);
          } else {
            setValidMethodSMTP((prev) => prev + 1);
          }

        } else {
          newResults.invalid.push(email);
        }
      } catch (err) {
        //local env test
        if (email === 'guliman.nicu@gmail.com') {
          validEmails.push(email);
        }
        newResults.unreachable.push(email);
        console.warn(`Error verifying email ${email}:`, err.message);
      }

      // Update progress
      setProgress(((i + 1) / totalEmails) * 100);
    }

    // Update results and mark as completed
    setResults(newResults);
    setCompleted(true);
    setLoading(false);
    setValidEmails(validEmails);
    setTotalTimeTaken(calculateElapsedTime(currTime));
  };

// Function to calculate time difference
  const calculateElapsedTime = (start) => {
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Date.now() - start;

    // Convert milliseconds to seconds
    return Math.floor(differenceInMilliseconds / 1000);
  };




  // Function to write the valid emails to a CSV file
  const writeValidEmailsToCSV = async () => {
    try {
      const response = await axios.post('/api/emailVerifier/writeValidEmails', {
        fileName,
        validEmails
      });

      console.log(response);

      // Check if there's a notification in the response
      // if (response.notification) {
      //   addNotification({
      //     message: response.notification.message,
      //     type: response.notification.type, // 'success', 'error', or 'info'
      //   });
      // }
      await fetchValidEmailList();
    } catch (error) {
      console.error('Error writing CSV:', error);
    }
  };

  const resetAll = () => {
    setError(''); // Clear any previous errors
    setValidEmails([]);
    setEmails([]);
    setResults({ valid: [], invalid: [], unreachable: [] });
    setProgress(0);
    setCompleted(false);
    setSkipValidation(false)
  }

  const copyToClipboard = () => {
    const textArea = document.getElementById('validEmailsTextArea');
    if (textArea) {
      // Select the content of the textarea
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices

      // Use the Clipboard API (modern approach)
      navigator.clipboard.writeText(textArea.value)
        .then(() => {
          alert('Copied to clipboard!'); // You can customize this message
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <Section style={{ border: 'none' }}>
      <Label style={{ color: '#6c757d', fontWeight: 300 }}>
        <Text>Email Verifier</Text>
      </Label>
      <Section style={{ backgroundColor: '#fff', border: 'none' }}>
        <Box mb="lg">
          {/* Filename Input */}
          <Box mb="lg">
            <Input
              value={fileName}
              placeholder="Enter the file name"
              onChange={(e) => setFileName(e.target.value)}
              style={{ width: '100%' }}
            />
            <Button onClick={fetchEmailList} variant="primary" mt="lg">
              Load Emails
            </Button>
            {/* Show the "Load Valid Emails" button only if the valid file exists */}
            {fileExists && (
              <Button
                mt="lg"
                onClick={fetchValidEmailList}
                variant="secondary"
                style={{ left: '30%', position: 'absolute'}}
              >
                Load Valid Emails (this file was already checked)
              </Button>
            )}
          </Box>

          {/* Error Display */}
          {error && <Text style={{ color: 'red', marginTop: '10px' }}>{error}</Text>}

          {/* Start Verification Button */}
          {emails.length > 0 && !loading && !completed && (
            <>
              <Text>Total Emails: {emails.length}</Text>
              <Button onClick={verifyEmails} variant="primary" mt="lg">
                Start Verification
              </Button>
            </>
          )}

          {/* Loading and Progress */}
          {loading && (
            <>
              <ProgressBar value={progress} max={100}/>
              <Text>Verifying emails... {Math.round(progress)}%</Text>
              <div>
                <Text>Time Elapsed: {formatTime(elapsedTime)}</Text>
                <Text>Estimated Time Left: {formatTime(estimatedTimeLeft)}</Text>
              </div>
            </>
          )}

          {/* Results */}
          {completed && (
            <>
              { !skipValidation ?
                <>
                  <Text style={{marginTop: '20px'}}>Verification Completed!</Text>
                  <Text>Valid Emails: {results.valid.length} ({validMethodExistence} | {validMethodSMTP} | {validMethodMailsSO})</Text>
                  <Text>Invalid Emails: {results.invalid.length}</Text>
                  <Text>Unreachable Emails: {results.unreachable.length}</Text>
                </> :
                <Text>Valid Emails: {validEmails.length}</Text>
              }

              {totalTimeTaken !== null && (
                <div>
                  <Text>Total Time Taken: {formatTime(totalTimeTaken)}</Text>
                </div>
              )}
              {validEmails.length && (
                <>
                  <div>
                  <textarea
                    value={validEmails.join('\n')} // Display valid emails, each on a new line
                    readOnly
                    rows={10}
                    cols={50}
                    id="validEmailsTextArea"
                  />
                    {/* Copy to Clipboard Button */}
                    <Button variant="secondary" onClick={copyToClipboard} style={{position: 'absolute', margin: '0 10px'}}>
                      Copy to Clipboard
                    </Button>
                  </div>
                  { !skipValidation && <Button  variant="info" mt="lg" onClick={writeValidEmailsToCSV}>Write Valid Emails to a CSV file</Button>}
                  { skipValidation && <Button variant="danger" mt="lg" onClick={resetAll}>Reset</Button>}
                </>
              )
              }
            </>
          )}
        </Box>
      </Section>
    </Section>
  );
};

export default EmailVerifier;
