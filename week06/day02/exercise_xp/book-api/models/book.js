const pool = require('../config/database');

class Book {
 
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publishedYear INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await pool.query(query);
      console.log('Books table created or already exists');
    } catch (error) {
      console.error('Error creating books table:', error);
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM books ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Create new book
  static async create(title, author, publishedYear) {
    const query = `
      INSERT INTO books (title, author, publishedYear) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [title, author, publishedYear]);
    return result.rows[0];
  }

  // Update book
  static async update(id, title, author, publishedYear) {
    const query = `
      UPDATE books 
      SET title = $1, author = $2, publishedYear = $3, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [title, author, publishedYear, id]);
    return result.rows[0];
  }

  // Delete book
  static async delete(id) {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}


Book.createTable().catch(console.error);

module.exports = Book;