import React, { useEffect, useState } from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

const EmailVerifier = ({ record, resource }) => {
  const [loading, setLoading] = useState(true); // For loading state

  if (loading) {
    return (<>
      <p>Loading...</p>
      <Text>Logic not added</Text>
    </>);
  }

  return (
    <Box mb="lg">
      <Label htmlFor={resource?.properties?.transactionCount?.name} style={{color: '#6c757d', fontWeight: 300}}>
        <Text>Add logic here</Text>
      </Label>
    </Box>
  )

};

export default EmailVerifier;
