const WebSocket = require('ws');

let wss;

const startWebSocketServer = (server) => {
  wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

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

    wss.handleUpgrade(request, socket, head, (ws) => {
      console.log('WebSocket upgrade handled, emitting connection event');
      wss.emit('connection', ws, request);
    }).on('error', (error) => {
      console.error('Error handling WebSocket upgrade:', error);
    });
  });

  console.log('WebSocket server started');
};

const broadcastMessage = (message) => {
  if (wss) {
    console.log('Attempting to broadcast message:', message);
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

module.exports = { startWebSocketServer, broadcastMessage };
