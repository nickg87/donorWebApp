import React from 'react';
import { Box, Label, Text, RichText } from '@adminjs/design-system';

// Define the component for displaying multilingual description
const DescriptionShow = ({ record }) => {
  // Extract description from the nested params property
  const description = {
    en: record.params['description.en'] || '',
    es: record.params['description.es'] || ''
  };

  return (
    <Box mb="lg">
      <Box mb="lg">
        <Label htmlFor="description-en" style={{ color: '#6c757d', fontWeight: 300 }}> {/* Greyed out color */}
          Description (English)
        </Label>
        <Text id="description-en" style={{ color: '#000', fontWeight: 'normal' }}
              dangerouslySetInnerHTML={{ __html: description['en'] }} />
      </Box>
      <Box>
        <Label htmlFor="description-es" style={{ color: '#6c757d', fontWeight: 300 }}> {/* Greyed out color */}
          Description (Spanish)
        </Label>
        <Text id="description-es" style={{ color: '#000', fontWeight: 'normal' }}
              dangerouslySetInnerHTML={{ __html: description['es'] }} />
      </Box>
    </Box>
  );
};

export default DescriptionShow;
