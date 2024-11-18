import axios from "axios";
import {text} from "@fortawesome/fontawesome-svg-core";

export const timestampToDateString = (timestamp) => {
  console.log('timestamp');
  console.log(timestamp);
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Adjust locale and format as needed
};

export const getTimeAgo = (timestamp, lang = 'en') => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMs = now - date; // Difference in milliseconds
  const diffInSeconds = Math.floor(diffInMs / 1000); // Convert to seconds

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} ${lang === 'en' ? 'day' : 'dia'}${diffInDays !== 1 ? 's' : ''}`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${lang === 'en' ? 'hour' : 'hora'}${diffInHours !== 1 ? 's' : ''}`;
  } else {
    return `${diffInMinutes} ${lang === 'en' ? 'minute' : 'minuto'}${diffInMinutes !== 1 ? 's' : ''}`;
  }
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Address copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
};

export const themeCustomClass = (theme) => {
  if(theme === 'dark') {
    return `darkTheme`;
  } else return  'lightTheme';
};

export const fetchCurrentPool = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  try {
    const response = await axios.get(`${apiUrl}pools/current-pool`);
     // Axios returns the data in the `data` property
    //console.log(data);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchCurrentTransactionsForPoolId = async (poolID) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  try {
    const response = await axios.get(`${apiUrl}transactions/allById/${poolID}`);
     // Axios returns the data in the `data` property
    //console.log(data);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

