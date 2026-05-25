// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { upload, uploadFolder } = require('./utils/storage');
const db = require('./config/db');
const fs = require('fs');
const bwipjs = require('bwip-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Upload endpoint (for book cover or PDF)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return relative path for client usage
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ filename: req.file.originalname, url: fileUrl });
});

// Get book by serial code
app.get('/api/books/:serial_code', async (req, res) => {
  const { serial_code } = req.params;
  try {
    const result = await db.query('SELECT title, cover_path, barcode_path, status FROM books WHERE serial_code = $1', [serial_code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
