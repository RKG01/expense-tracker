const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.NODE_ENV === 'test'
  ? ':memory:'
  : path.join(__dirname, 'expenses.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    request_id TEXT UNIQUE,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  if (process.env.NODE_ENV !== 'test') {
    db.all(`PRAGMA table_info(expenses)`, (err, rows) => {
      if (err) {
        console.error('Failed reading expenses schema:', err.message);
        return;
      }
      const hasRequestId = rows.some(col => col.name === 'request_id');
      if (!hasRequestId) {
        db.run(`ALTER TABLE expenses ADD COLUMN request_id TEXT`, (alterErr) => {
          if (alterErr) {
            console.error('Failed adding request_id column:', alterErr.message);
          }
        });
      }
    });

    db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_expenses_request_id ON expenses(request_id)`);
  }
});

module.exports = db;