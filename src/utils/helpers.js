import axios from "axios";

export const timestampToDateString = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Adjust locale and format as needed
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Address copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
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