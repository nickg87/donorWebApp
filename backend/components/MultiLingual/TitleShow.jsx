import React from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

// Define the component for displaying multilingual title
const TitleShow = ({ record }) => {
  // Extract title from the nested params property
  const title = ((record.params && record.params.title) || record.title) || {};

  return (
    <Box mb="lg">
      <Box mb="lg">
        <Label htmlFor="title-en" style={{ color: '#6c757d', fontWeight: 300 }}> {/* Greyed out color */}
          Title (English)
        </Label>
        <Text id="title-en" style={{ color: '#000', fontWeight: 'normal' }}>{title['en'] || ''}</Text>
      </Box>
      <Box>
        <Label htmlFor="title-es" style={{ color: '#6c757d', fontWeight: 300 }}> {/* Greyed out color */}
          Title (Spanish)
        </Label>
        <Text id="title-es" style={{ color: '#000', fontWeight: 'normal' }}>{title['es'] || ''}</Text>
      </Box>
    </Box>
  );
};

export default TitleShow;
