// config/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional SSL for production (e.g., Vercel)
  // ssl: { rejectUnauthorized: false },
});

// Test connection at startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection error:', err.stack);
  } else {
    console.log('✅ Connected to PostgreSQL');
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('🛑 PostgreSQL pool has ended');
    process.exit(0);
  });
});
