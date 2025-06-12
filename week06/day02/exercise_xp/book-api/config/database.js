const { Pool } = require('pg');

console.log('Database configuration:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);

const pool = new Pool({
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT || 3000 ,
  database: process.env.DB_NAME ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log(`Connected to PostgreSQL database: ${process.env.DB_NAME}`);
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

module.exports = pool;