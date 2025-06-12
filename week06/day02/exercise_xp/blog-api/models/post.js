const pool = require('../config/database');

class Post {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await pool.query(query);
      console.log('Posts table created or already exists');
    } catch (error) {
      console.error('Error creating posts table:', error);
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(title, content) {
    const query = `
      INSERT INTO posts (title, content) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    const result = await pool.query(query, [title, content]);
    return result.rows[0];
  }

  static async update(id, title, content) {
    const query = `
      UPDATE posts 
      SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3 
      RETURNING *
    `;
    const result = await pool.query(query, [title, content, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

Post.createTable().catch(console.error);

module.exports = Post;