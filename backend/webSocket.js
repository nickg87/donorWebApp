const WebSocket = require('ws');

let wss;

const startWebSocketServer = (server) => {
  wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    ws.on('message', (message) => {
      console.log('Received message from client:', message);
    });
  });

  // Upgrade HTTP server to handle WebSocket requests
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  console.log('WebSocket server started');
};

const broadcastMessage = (message) => {
  if (wss) {
    console.log('Broadcasting message:', message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log('Sending message to client:', message);
        client.send(JSON.stringify(message));
      } else {
        console.log('Client is not open:', client.readyState);
      }
    });
  } else {
    console.log('WebSocket Server (wss) is not defined.');
  }
};

module.exports = { startWebSocketServer, broadcastMessage };
