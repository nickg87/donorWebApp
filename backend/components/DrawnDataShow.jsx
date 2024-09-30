import React from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

// Define the component for displaying drawn data
const DrawnDataShow = ({ record }) => {
  // Access drawn_data from record.params
  const drawnData = Object.keys(record.params).filter(key => key.startsWith('drawn_data.'));

  // Extract the properties from drawn_data
  const drawnDataObject = drawnData.reduce((acc, key) => {
    const fieldKey = key.replace('drawn_data.', ''); // Remove the prefix
    acc[fieldKey] = record.params[key];
    return acc;
  }, {});

  console.log('Drawn Data Object:', drawnDataObject); // For debugging

  // Convert the drawn data object to a pretty-printed JSON string
  const drawnDataSnippet = JSON.stringify(drawnDataObject, null, 2);

  return (
    <Box mb="lg">
      <Box mb="lg">
        <Label htmlFor="drawn_data" style={{color: '#6c757d', fontWeight: 300}}>
          DATA
        </Label>
        <pre style={{backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px'}}>
          <code style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>
            {drawnDataSnippet}
          </code>
        </pre>
      </Box>
    </Box>
  );
};

export default DrawnDataShow;
