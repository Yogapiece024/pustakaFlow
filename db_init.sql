/* db_init.sql */
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  serial_code VARCHAR(50) UNIQUE NOT NULL,
  cover_path TEXT,
  pdf_path TEXT,
  status VARCHAR(20) DEFAULT 'Tersedia',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
