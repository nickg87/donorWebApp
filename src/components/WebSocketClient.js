// components/WebSocketClient.js

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';

const WebSocketClient = () => {
  const [balance, setBalance] = useState(null);
  const [newTransactionsCount, setNewTransactionsCount] = useState(0);
  const { globalState, updateBalance, updateShouldFetch } = useAppContext();
  const backend_api_port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  useEffect(() => {
    // Open a WebSocket connection to the backend
    const ws = new WebSocket(`ws://${process.env.NEXT_PUBLIC_BACKEND_API_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`);


    // Handle messages received from the WebSocket server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'UPDATE') {
        setBalance(data.balance);
        setNewTransactionsCount(data.newTransactionsCount);

        updateBalance(parseFloat(data.balance) * 100); // Assuming USD conversion is done on frontend
        if (globalState.shouldFetch) {
          updateShouldFetch(false);
        }

      }
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
