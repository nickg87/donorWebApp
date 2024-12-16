import React, {useEffect, useState} from 'react';
import {Box, Button, Input, Label, Section, Text} from '@adminjs/design-system';
import ProgressBar from './UI/ProgressBar';
import axios from 'axios';

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

    setError(''); // Clear any previous errors
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
        const { valid } = response.data;

        if (valid) {
          newResults.valid.push(email);
          validEmails.push(email);
        } else {
          newResults.invalid.push(email);
        }
      } catch (err) {
        newResults.unreachable.push(email);
        console.error(`Error verifying email ${email}:`, err.message);
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
    console.log('start: ')
    console.log(start)

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Date.now() - start;

    // Convert milliseconds to seconds
    return Math.floor(differenceInMilliseconds / 1000);
  };

  // Convert seconds to human-readable format (hours, minutes, seconds)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let timeString = '';

    if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    if (remainingSeconds > 0) timeString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;

    return timeString || '0 seconds'; // Return 0 seconds if no time was provided
  };

  return (
    <Section>
      <Label style={{ color: '#6c757d', fontWeight: 300 }}>
        <Text>Email Verifier</Text>
      </Label>
      <Section className="adminjs_Box">
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
                <Text>Time Elapsed: {elapsedTime} seconds</Text>
                <Text>Estimated Time Left: {estimatedTimeLeft} seconds</Text>
              </div>
            </>
          )}

          {/* Results */}
          {completed && (
            <>
              <Text style={{marginTop: '20px'}}>Verification Completed!</Text>
              <Text>Valid Emails: {results.valid.length}</Text>
              <Text>Invalid Emails: {results.invalid.length}</Text>
              <Text>Unreachable Emails: {results.unreachable.length}</Text>
              {totalTimeTaken !== null && (
                <div>
                  <Text>Total Time Taken: {formatTime(totalTimeTaken)}</Text>
                </div>
              )}
              {validEmails.length && (
                <div>
                  <textarea
                    value={validEmails.join('\n')} // Display valid emails, each on a new line
                    readOnly
                    rows={10}
                    cols={50}
                  />
                </div>)
              }
            </>
          )}
        </Box>
      </Section>
    </Section>
  );
};

export default EmailVerifier;
