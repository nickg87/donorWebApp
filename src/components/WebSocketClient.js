// components/WebSocketClient.js

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';

const WebSocketClient = () => {
  const [balance, setBalance] = useState(null);
  const [newTransactionsCount, setNewTransactionsCount] = useState(0);
  const { globalState, updateBalance, updateShouldFetch } = useAppContext();
  const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

      ws.onopen = () => {
        if (isDev) console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (isDev) console.log('Message received from WebSocket server:', data);
          if (data.type === 'UPDATE') {
            setBalance(data.balance);
            setNewTransactionsCount(data.newTransactionsCount);
            updateBalance(parseFloat(data.balance) * 100); // Assuming USD conversion is done on frontend
            if (globalState.shouldFetch) {
              updateShouldFetch(false);
            }
          }
        } catch (error) {
          if (isDev) console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        if (isDev) console.log('WebSocket connection closed', event);
        if (event.code !== 1000) {
          if (isDev) console.error('WebSocket closed with error code:', event.code);
          // Optionally, attempt to reconnect
          setTimeout(connectWebSocket, 500); // Retry after .5 second
        }
      };

      return ws;
    };

    const ws = connectWebSocket();

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