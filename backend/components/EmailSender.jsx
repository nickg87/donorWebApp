import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Label, Section, Text } from '@adminjs/design-system';
import ProgressBar from './UI/ProgressBar';
import axios from 'axios';
import { addNotification } from 'adminjs';

const EmailSender = () => {
  const [fileName, setFileName] = useState('test0.csv');
  const [validEmails, setValidEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  const fetchValidEmailList = async () => {
    setError('');
    setValidEmails([]);
    setCompleted(false);

    try {
      const response = await axios.get(`/api/emailVerifier/fetchValidEmailList/${fileName}`);
      if (response.data?.emails?.length > 0) {
        setValidEmails(response.data.emails);

        console.log(response.data.emails);
      } else {
        setError('No emails found in the file.');
      }
    } catch (err) {
      setError(`Error fetching email list: ${err.message}`);
    }
  };

  const sendEmails = async () => {
    if (!validEmails.length || !subject || !body) {
      setError('Please provide subject, body, and a list of emails');
      return;
    }

    setProgress(0);
    setCompleted(false);

    try {
      const response = await axios.post('/api/emailSender/sendEmails', {
        emails: validEmails,
        subject: subject,
        body: body,
      });
      console.log((response));
      if (response.data.success) {
        console.log(`Successfully sent ${response.data.success} emails.`)
        // addNotification({
        //   message: `Successfully sent ${response.data.success} emails.`,
        //   type: 'success',
        // });
      }

      setCompleted(true);
    } catch (err) {
      setError(`Error sending emails: ${err.message}`);
    }
  };

  return (
    <Section style={{ border: 'none' }}>
      <Label style={{ color: '#6c757d', fontWeight: 300 }}>
        <Text>Email Sending</Text>
      </Label>
      <Section style={{ backgroundColor: '#fff', border: 'none' }}>
        <Box mb="lg">
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            label="Subject"
          />
          <Input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email body"
            label="Body"
          />
          <Button onClick={fetchValidEmailList}>Fetch Valid Email List</Button>
          <Button onClick={sendEmails} disabled={completed}>Send Emails</Button>

          {error && <Text color="danger">{error}</Text>}
          {completed && <Text color="success">Emails sent successfully!</Text>}
          <Box mt="lg">
            <ProgressBar value={progress} max={100}/>
          </Box>
        </Box>
      </Section>
    </Section>
  );
};

export default EmailSender;
