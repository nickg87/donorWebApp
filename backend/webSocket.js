//webSocket.js
const WebSocket = require('ws');

let wss;
let recentMessages = []; // Buffer to store recent messages

const startWebSocketServer = (server) => {
  wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Send recent messages to the newly connected client
    recentMessages.forEach((message) => {
      ws.send(JSON.stringify(message));
    });

    ws.on('message', (message) => {
      console.log('Received message from client:', message);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  server.on('upgrade', (request, socket, head) => {
    console.log('Handling WebSocket upgrade request');

    try {
      wss.handleUpgrade(request, socket, head, (ws) => {
        console.log('WebSocket upgrade handled, emitting connection event');
        wss.emit('connection', ws, request);
      });
    } catch (error) {
      console.error('Error handling WebSocket upgrade:', error);
    }
  });

  console.log('WebSocket server started');

  // Set up periodic buffer clearing every 5 minutes (300000 ms)
  setInterval(clearBuffer, 300000);
};

// Broadcast a message to all connected clients and store it in the buffer
const broadcastMessage = (message) => {
  if (wss) {
    console.log('Attempting to broadcast message:', message);
    recentMessages.push(message); // Store message in buffer
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log('Sending message to client:', message);
        client.send(JSON.stringify(message));
      } else {
        console.log('Client is not open. ReadyState:', client.readyState);
      }
    });
  } else {
    console.error('WebSocket Server (wss) is not defined.');
  }
};

// Function to clear the buffer
const clearBuffer = () => {
  console.log('Clearing recent messages buffer');
  recentMessages = []; // Clear the buffer
};

module.exports = { startWebSocketServer, broadcastMessage };

