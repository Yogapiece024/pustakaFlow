// utils/storage.js
const multer = require('multer');
const path = require('path');

// Destination folder (relative to project root)
const uploadFolder = path.join(__dirname, '..', 'uploads');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Preserve original name with timestamp to avoid collisions
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${base}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = { upload, uploadFolder };
