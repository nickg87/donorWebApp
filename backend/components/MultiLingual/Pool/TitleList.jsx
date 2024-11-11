import React from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

// Define the component for displaying multilingual title
const TitleList = ({ record }) => {
  // Extract title from the nested params property
  const title = ((record.params && record.params.title) || record.title) || {};

  return (
    <Box mb="lg">
        <Text id="title-en" className={'adminjs_Text'} style={{ color: '#000', fontWeight: 'normal' }}>
          EN:  {title['en'] || ''}
        </Text>
      <Text id="title-es" className={'adminjs_Text'} style={{ color: '#000', fontWeight: 'normal' }}>
        ES: {title['es'] || ''}
      </Text>
    </Box>
  );
};

export default TitleList;
