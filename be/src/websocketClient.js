const WebSocket = require('ws');
const db = require('./database');

require('dotenv').config();

const wsUrl = process.env.WS_URL;

function connectWebSocket(wsUrl, db, WebSocket) {
  const wsClient = new WebSocket(wsUrl);

  wsClient.on('open', function open() {
    console.log('Connected to WebSocket');
  });

  wsClient.on('message', function incoming(data) {
    const message = JSON.parse(data);
    const { machine_id, id, timestamp, status } = message;
    const stmt = db.prepare(
      'INSERT INTO machine_status (id, machine_id, timestamp, status) VALUES (?, ?, ?, ?)'
    );
    stmt.run(id, machine_id, timestamp, status, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with id ${id}`);
    });
    stmt.finalize();
  });

  wsClient.on('close', function close() {
    console.log('Disconnected from WebSocket');
    setTimeout(connectWebSocket, 5000);
  });

  wsClient.on('error', function error(err) {
    console.error('WebSocket encountered an error:', err.message);
    wsClient.close();
  });
}

connectWebSocket(wsUrl, db, require('ws'));

module.exports = connectWebSocket;
