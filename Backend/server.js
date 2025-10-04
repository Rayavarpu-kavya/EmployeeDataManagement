const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite DB');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  position TEXT NOT NULL
)`, (err) => {
  if (!err) {
    // Reset AUTOINCREMENT only if table is empty
    db.get('SELECT COUNT(*) as count FROM employees', (err, row) => {
      if (err) console.error(err.message);
      else if (row.count === 0) {
        db.run('DELETE FROM sqlite_sequence WHERE name="employees"');
        console.log('AUTOINCREMENT reset to start from 1');
      }
    });
  }
});

// Routes

// Get all employees
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single employee
app.get('/api/employees/:id', (req, res) => {
  db.get('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Add employee
app.post('/api/employees', (req, res) => {
  const { name, email, position } = req.body;
  console.log("📥 New employee data received:", req.body); // Debug log

  if (!name || !email || !position) {
    return res.status(400).json({ error: "All fields (name, email, position) are required" });
  }

  db.run(
    'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
    [name, email, position],
    function (err) {
      if (err) {
        console.error("❌ Insert error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log(`✅ Employee added with ID ${this.lastID}`);
      res.json({ id: this.lastID, name, email, position });
    }
  );
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
  const { name, email, position } = req.body;
  db.run(
    'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?',
    [name, email, position, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updatedID: req.params.id, name, email, position });
    }
  );
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedID: req.params.id });
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
