const mysql = require('mysql2/promise');

// Add debug logs
console.log('Creating database connection with:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'actpha11',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if database connection fails
  }
};

testConnection();

module.exports = pool; 
module.exports = pool; 