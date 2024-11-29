import React from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

// Define the component for displaying multilingual title
const DescriptionList = ({ record }) => {
  // Extract description from the nested params property
  const description = {
    en: record.params['description.en'] || '',
    es: record.params['description.es'] || ''
  };

  return (
    <Box mb="lg">
        <Text id="title-en" style={{ color: '#000', fontWeight: 'normal' }}>
          EN:  {description['en'] || ''}
        </Text>
      <Text id="title-en" style={{ color: '#000', fontWeight: 'normal' }}>
        ES: {description['es'] || ''}
      </Text>
    </Box>
  );
};

export default DescriptionList;
