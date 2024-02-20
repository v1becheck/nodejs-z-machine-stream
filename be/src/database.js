const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const DB_PATH = path.join(__dirname, '..', 'db', 'z_machine_stream.db');

if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH));
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Established SQLite connection.');

  const tableName = 'machine_status';

  db.run(
    `CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    machine_id TEXT,
    timestamp TEXT,
    status TEXT
  )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Table '${tableName}' created or already exists.`);
      }
    }
  );
});

module.exports = db;
