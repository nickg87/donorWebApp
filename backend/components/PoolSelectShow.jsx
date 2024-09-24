import React from 'react';
import { Box, Label, Text } from '@adminjs/design-system';

const PoolSelectShow = ({ record, resource }) => {
  console.log('record:');
  console.log(record);
  console.log('resource:');
  const { params } = record;

  // Get available pool options
  const availableValues = resource?.properties?.poolId?.availableValues || [];

  // Find the pool object that matches the params.poolId
  const selectedPool = availableValues.find(option => option.value === params.poolId);

  // Get the label (title) of the selected pool, or a fallback if not found
  const selectedPoolIdTitle = selectedPool ? selectedPool.label : 'No Pool Selected';

  return (
    <Box>
      <Label htmlFor={resource?.properties?.poolId?.name} style={{ color: '#6c757d', fontWeight: 300 }}>
        Pool Title
      </Label>
      <Text id={resource?.properties?.poolId?.name} style={{ color: '#000', fontWeight: 'normal' }}>
        {selectedPoolIdTitle}
      </Text>
    </Box>
  );
};

export default PoolSelectShow;
