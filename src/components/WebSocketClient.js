// components/WebSocketClient.js

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';

const WebSocketClient = () => {
  const [balance, setBalance] = useState(null);
  const [newTransactionsCount, setNewTransactionsCount] = useState(0);
  const { globalState, updateBalance, updateShouldFetch } = useAppContext();

  useEffect(() => {
    // Open a WebSocket connection to the backend
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Message received from WebSocket server:', data);
        if (data.type === 'UPDATE') {
          setBalance(data.balance);
          setNewTransactionsCount(data.newTransactionsCount);

          updateBalance(parseFloat(data.balance) * 100); // Assuming USD conversion is done on frontend
          if (globalState.shouldFetch) {
            updateShouldFetch(false);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <p>Balance: {balance} ETH</p>
      <p>New Transactions: {newTransactionsCount}</p>
    </div>
  );
};

export default WebSocketClient;
