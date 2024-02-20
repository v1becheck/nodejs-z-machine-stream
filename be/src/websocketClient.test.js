jest.mock('sqlite3', () => {
  return {
    verbose: jest.fn(() => ({
      Database: jest.fn().mockImplementation(() => ({
        prepare: jest.fn().mockReturnThis(),
        run: jest.fn((sql, params, callback) => {
          if (typeof callback === 'function') {
            callback(null);
          }
        }),
        finalize: jest.fn(),
      })),
    })),
  };
});

const WebSocket = require('ws');
const connectWebSocket = require('./websocketClient');

describe('WebSocket client with external WebSocket server', () => {
  const wsUrl = '<placeholder>';

  test('connect and handle messages ', (done) => {
    const db = {
      prepare: jest.fn().mockReturnThis(),
      run: jest.fn((sql, params, callback) => {
        if (typeof callback === 'function') {
          callback(null);
        }
      }),
      finalize: jest.fn(),
    };

    connectWebSocket(wsUrl, db, WebSocket);

    setTimeout(() => {
      expect(db.prepare).toHaveBeenCalled();

      done();
    }, 10000);
  });
});
