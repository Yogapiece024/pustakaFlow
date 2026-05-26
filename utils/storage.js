// utils/storage.js
// Uses memoryStorage for Vercel serverless compatibility.
// Files are available as req.file.buffer (Buffer) instead of a path.
const multer = require('multer');
const path = require('path');

// Keep uploadFolder for local reference / legacy use — not written on Vercel
const uploadFolder = path.join(__dirname, '..', 'uploads');

// In-memory storage (Vercel's file system is read-only)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload, uploadFolder };
