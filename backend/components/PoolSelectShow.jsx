import React from 'react';
import { Box, Label, Text, Link } from '@adminjs/design-system';

const PoolSelectShow = ({ record, resource }) => {
  console.log('record:', record);
  const { params } = record;

  // Get available pool options
  const availableValues = resource?.properties?.poolId?.availableValues || [];

  // Find the pool object that matches the params.poolId
  const selectedPool = availableValues.find(option => option.value === params.poolId);

  // Get the label (title) of the selected pool, or a fallback if not found
  const selectedPoolIdTitle = selectedPool ? selectedPool.label : 'No Pool Selected';

  // Construct the URL to the related pool's detail page
  const poolShowUrl = selectedPool ? `/admin/resources/pools/records/${params.poolId}/show` : null;

  return (
    <Box mb="lg">
      <Label htmlFor={resource?.properties?.poolId?.name} style={{ color: '#6c757d', fontWeight: 300 }}>
        Pool Title
      </Label>
      {selectedPool ? (
        <Link href={poolShowUrl} style={{ color: '#007bff', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          {selectedPoolIdTitle}
        </Link>
      ) : (
        <Text id={resource?.properties?.poolId?.name} style={{ color: '#000', fontWeight: 'normal' }}>
          {selectedPoolIdTitle}
        </Text>
      )}
    </Box>
  );
};

export default PoolSelectShow;
