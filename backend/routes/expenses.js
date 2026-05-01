const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// POST /expenses
router.post('/', (req, res) => {
  const { amount, category, description, date, requestId } = req.body;
  if (!amount || !category || !description || !date || !requestId) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const normalizedCategory = category.trim().toLowerCase();
  if (!normalizedCategory) {
    return res.status(400).json({ error: 'Category cannot be empty' });
  }
  const amountCents = Math.round(amount * 100);
  if (amountCents <= 0) {
    return res.status(400).json({ error: 'Amount must be positive' });
  }

  // Check for existing requestId
  db.get(`SELECT * FROM expenses WHERE request_id = ?`, [requestId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      // Return existing expense
      return res.status(200).json({
        id: row.id,
        amount: row.amount / 100,
        category: row.category,
        description: row.description,
        date: row.date,
        created_at: row.created_at
      });
    }

    const id = uuidv4();
    const created_at = new Date().toISOString();
    db.run(`INSERT INTO expenses (id, request_id, amount, category, description, date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, requestId, amountCents, normalizedCategory, description, date, created_at], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id, amount: amountCents / 100, category: normalizedCategory, description, date, created_at });
      });
  });
});

// GET /expenses
router.get('/', (req, res) => {
  const { category, sort } = req.query;
  let query = 'SELECT * FROM expenses';
  let params = [];
  if (category) {
    query += ' WHERE category = ?';
    params.push(category.trim().toLowerCase());
  }
  if (sort === 'date_desc') {
    query += ' ORDER BY date DESC';
  }
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const expenses = rows.map(row => ({
      id: row.id,
      amount: row.amount / 100,
      category: row.category,
      description: row.description,
      date: row.date,
      created_at: row.created_at
    }));
    res.json(expenses);
  });
});

module.exports = router;