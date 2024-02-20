const express = require('express');
const db = require('./database');
require('./websocketClient');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/machine-status', (req, res) => {
  const sql = 'SELECT * FROM machine_status ORDER BY timestamp DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
