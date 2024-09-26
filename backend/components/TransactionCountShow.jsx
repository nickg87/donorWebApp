import React, { useEffect, useState } from 'react';
import { Box, Label, Text, Link } from '@adminjs/design-system';

const TransactionCount = ({ record, resource }) => {
  const [transactionCount, setTransactionCount] = useState(0);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchTransactionCount = async () => {
      const recordId = record?.params?.id;

      if (recordId) {
        setLoading(true); // Set loading to true before the request
        try {
          const response = await fetch(`/api/transactions/count/${recordId}`);
          const data = await response.json();
          setTransactionCount(data.count);
        } catch (error) {
          console.error("Error fetching transaction count:", error);
        } finally {
          setLoading(false); // Set loading to false after the request completes
        }
      }
    };

    fetchTransactionCount();
  }, [record]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching
  }

  return (
    <Box mb="lg">
    <Label htmlFor={resource?.properties?.transactionCount?.name} style={{color: '#6c757d', fontWeight: 300}}>
      Transactions Count
    </Label>
    <Text id={resource?.properties?.transactionCount?.name} style={{color: '#000', fontWeight: 'normal'}}>
      {transactionCount}
    </Text>
  </Box>
  )

};

export default TransactionCount;
