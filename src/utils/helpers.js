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