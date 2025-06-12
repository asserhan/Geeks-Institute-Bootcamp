const pool = require('./database');

const initializeDatabase = async () => {
  try {
    console.log('🔧 Initializing database tables...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created/verified');

    // Create hashpwd table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hashpwd (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_username FOREIGN KEY (username)
          REFERENCES users(username)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      );
    `);
    console.log('✅ Hashpwd table created/verified');

    // Show tables
    const res = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('users', 'hashpwd');
    `);

    const foundTables = res.rows.map(r => r.table_name).join(', ');
    console.log(`📊 Tables found: ${foundTables}`);

    console.log('🎉 Database tables initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
