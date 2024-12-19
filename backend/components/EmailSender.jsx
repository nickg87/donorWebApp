import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Label, Section, Text } from '@adminjs/design-system';
import ProgressBar from './UI/ProgressBar';
import axios from 'axios';
import {formatTime} from "../utils/miscellaneous.js";

const EmailSender = () => {
  const defaultSubject = '🎉 Don’t Miss Out! Win some ETH NOW! 🎉';
  const [fileName, setFileName] = useState('test0.csv');
  const [validEmails, setValidEmails] = useState([]);
  const [failedEmails, setFailedEmails] = useState([]);
  const [sendEmailsCounter, setSendEmailsCounter] = useState(0);
  const [sendNotificationEmail, setSendNotificationEmail] = useState(null);
  const [failedEmailsCounter, setFailedEmailsCounter] = useState(0);
  const [subject, setSubject] = useState(defaultSubject);
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(0); // Estimated time left in seconds
  const [startTime, setStartTime] = useState(null); // Time when verification started
  const [totalTimeTaken, setTotalTimeTaken] = useState(null);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (startTime && !completed) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeSpent = Math.floor((now - startTime) / 1000);
        setElapsedTime(timeSpent);

        const progressRatio = progress / 100;
        if (progressRatio > 0) {
          const estimatedTime = Math.floor((timeSpent / progressRatio) - timeSpent);
          setEstimatedTimeLeft(estimatedTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else if (completed) {
      sendMasterNotificationEmail(sendEmailsCounter).then();
      setEstimatedTimeLeft(0); // Clear the estimated time left when completed
    }
  }, [startTime, progress, completed]);

  const fetchValidEmailList = async () => {
    setError('');
    setValidEmails([]);
    setCompleted(false);
    setSendNotificationEmail(null);

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

  const sendMasterNotificationEmail = async (number) => {
    console.log('number from sendEmailsCounter: ');
    console.log(number);
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
        const response = await axios.post('/api/emailSender/sendElasticEmail', {
          email: 'master',
          subject: `A total of ${number} emails were sent successfully!`,
        });
        //console.log((response));
        if (response.data.send) {
          setSendNotificationEmail(true);
        } else {
          setSendNotificationEmail(false);
          console.warn(`FAILED to sent MASTER NOTIFICATION email to ${email} .`);
          console.warn(`ERROR: ${response.data.error} .`);
        }

      } catch (err) {
        console.warn(`FAILED to sent MASTER NOTIFICATION email to ${email} .`);
        console.warn(`ERROR: ${err.message} .`);
        setSendNotificationEmail(false);
      }
      // Add a delay (e.g., 1 second) before sending the next email
      await timeout(1000); // Delay for 1000 milliseconds (1 second)
  };

  const sendElasticEmails = async () => {
    let currTime = Date.now();
    setStartTime(currTime);
    const totalEmails = validEmails.length;
    if (!validEmails.length || !subject ) {
      setError('Please provide subject, and a list of emails');
      return;
    }

    setProgress(0);
    setCompleted(false);
    setSendEmailsCounter(0);
    setFailedEmailsCounter(0);

    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < totalEmails; i++) {
      const email = validEmails[i];
      try {
        const response = await axios.post('/api/emailSender/sendElasticEmail', {
          email: email,
          subject: subject,
        });
        //console.log((response));
        if (response.data.send) {
          //console.log(`Successfully sent to ${response.data.email} .`)
          setSendEmailsCounter((prev) => prev + 1);

        } else {
          console.warn(`FAILED to sent to ${response.data.email} .`);
          console.warn(`ERROR: ${response.data.error} .`);
          setFailedEmailsCounter((prev) => prev + 1);
          failedEmails.push(email);
        }

      } catch (err) {
        console.warn(`FAILED to sent to ${email} .`);
        console.warn(`ERROR: ${err.message} .`);
        setFailedEmailsCounter((prev) => prev + 1);
        setError(`Error sending email: ${err.message}`);
        failedEmails.push(email);
      }
      setProgress(((i + 1) / totalEmails) * 100);
      // Add a delay (e.g., 1 second) before sending the next email
      await timeout(1000); // Delay for 1000 milliseconds (1 second)
    }
    console.log('Email sending process completed.');
    setCompleted(true);
    setFailedEmails(failedEmails);
    setLoading(false);
    setTotalTimeTaken(calculateElapsedTime(currTime));
  };

  // Function to calculate time difference
  const calculateElapsedTime = (start) => {
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Date.now() - start;

    // Convert milliseconds to seconds
    return Math.floor(differenceInMilliseconds / 1000);
  };


  return (
    <Section style={{ border: 'none' }}>
      <Label style={{ color: '#6c757d', fontWeight: 300 }}>
        <Text>Email Sending</Text>
      </Label>
      <Section style={{ backgroundColor: '#fff', border: 'none' }}>
        <Box mb="lg">
          <Input
            value={fileName}
            placeholder="Enter the file name"
            onChange={(e) => setFileName(e.target.value)}
            style={{ width: '100%' }}
          />
        </Box>

        <Box mb="lg">
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            label="Subject"
            style={{ width: '100%' }}
          />
        </Box>

        <Box mb="lg">
          <Button variant="primary" mt="lg" mr="lg" onClick={fetchValidEmailList}>Fetch Valid Email List</Button>
          <Button variant="primary" mt="lg" onClick={sendElasticEmails} disabled={completed}>Send Elastic Emails</Button>

          {error && <Text color="danger">{error}</Text>}
          {sendEmailsCounter > 0 && <Text color="success">{sendEmailsCounter} emails sent successfully!</Text>}
          {sendNotificationEmail && <Text color="success">MASTER NOTIFICATION email sent successfully!</Text>}
          {sendNotificationEmail === false && <Text className={'success'} color="danger">MASTER NOTIFICATION email FAILED!</Text>}
          {failedEmailsCounter > 0 && <Text className={'danger'} color="danger">{sendEmailsCounter} emails sent failed!</Text>}
          {failedEmails.length ?
            <Text color="danger">
              {failedEmails.join('\n')}
            </Text> : null  }

          <Box mt="lg">
            {!completed && (
              <>
                <ProgressBar value={progress} max={100}/>
                <Text>Sending emails... {Math.round(progress)}%</Text>
                <div>
                  <Text>Time Elapsed: {formatTime(elapsedTime)}</Text>
                  <Text>Estimated Time Left: {formatTime(estimatedTimeLeft)}</Text>
                </div>
              </>
            )}
            {(completed && totalTimeTaken !== null) && (
              <div>
                <Text>Total Time Taken: {formatTime(totalTimeTaken)}</Text>
              </div>
            )}
          </Box>
        </Box>
      </Section>
    </Section>
  );
};

export default EmailSender;
