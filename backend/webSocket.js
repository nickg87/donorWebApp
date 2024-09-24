import { WebSocketServer, WebSocket } from 'ws'; // Import both WebSocketServer and WebSocket

let wss;
let recentMessages = []; // Buffer to store recent messages

const startWebSocketServer = async (server) => {
  wss = new WebSocketServer({ noServer: true }); // Correct usage of WebSocketServer

  wss.on('connection', (ws) => {
    console.log('WEBSOCKET: New connection established');

    // Send recent messages to the newly connected client
    recentMessages.forEach((message) => {
      ws.send(JSON.stringify(message));
    });

    ws.on('message', (message) => {
      console.log('WEBSOCKET: Received message from client:', message);
    });

    ws.on('close', () => {
      console.log('WEBSOCKET: Connection closed');
    });

    ws.on('error', (error) => {
      console.error('WEBSOCKET: Error:', error);
    });
  });

  server.on('upgrade', (request, socket, head) => {
    console.log('WEBSOCKET: Handling upgrade request');

    try {
      wss.handleUpgrade(request, socket, head, (ws) => {
        console.log('WEBSOCKET: Upgrade handled, emitting connection event');
        wss.emit('connection', ws, request);
      });
    } catch (error) {
      console.error('WEBSOCKET: Error handling upgrade:', error);
    }
  });

  console.log('WEBSOCKET: Server started');

  // Set up periodic buffer clearing every 5 minutes (300000 ms)
  setInterval(clearBuffer, 300000);
};

// Broadcast a message to all connected clients and store it in the buffer
const broadcastMessage = (message) => {
  if (wss) {
    console.log('WEBSOCKET: Attempting to broadcast message:', message);
    recentMessages.push(message); // Store message in buffer
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log('WEBSOCKET: Sending message to client:', message);
        client.send(JSON.stringify(message));
      } else {
        console.log('WEBSOCKET: Client is not open. ReadyState:', client.readyState);
      }
    });
  } else {
    console.error('WEBSOCKET: Server (wss) is not defined.');
  }
};

// Function to clear the buffer
const clearBuffer = () => {
  console.log('WEBSOCKET: Clearing recent messages buffer');
  recentMessages = []; // Clear the buffer
};

export { startWebSocketServer, broadcastMessage };
