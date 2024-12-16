import React, { useState } from 'react';
import { Section, Box, Label, Text, Button, Input } from '@adminjs/design-system';
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
              <ProgressBar value={progress} max={100} />
              <Text>Verifying emails... {Math.round(progress)}%</Text>
            </>
          )}

          {/* Results */}
          {completed && (
            <>
              <Text style={{ marginTop: '20px' }}>Verification Completed!</Text>
              <Text>Valid Emails: {results.valid.length}</Text>
              <Text>Invalid Emails: {results.invalid.length}</Text>
              <Text>Unreachable Emails: {results.unreachable.length}</Text>
            </>
          )}
        </Box>
      </Section>
    </Section>
  );
};

export default EmailVerifier;
