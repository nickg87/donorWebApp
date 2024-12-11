import React from 'react';
import { Box, Link } from '@adminjs/design-system';

const PoolSelectList = ({ record, resource }) => {
  //console.log('record:', record);
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
      {selectedPool && (
          <>
            <p>{params.to}</p>
            <Link href={poolShowUrl} style={{ color: '#007bff', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
              <b>{params.poolId}:</b> {selectedPoolIdTitle}
            </Link>
          </>

      )}
    </Box>
  );
};

export default PoolSelectList;
