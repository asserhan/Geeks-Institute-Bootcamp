const pool = require('../config/database');

class User {
  constructor(userData) {
    this.email = userData.email;
    this.username = userData.username;
    this.first_name = userData.first_name;
    this.last_name = userData.last_name;
  }

  // Create user with transaction
  static async create(userData, hashedPassword) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insert into users table
      const userInsertText = `
        INSERT INTO users (email, username, first_name, last_name) 
        VALUES ($1, $2, $3, $4) RETURNING id
      `;
      const userResult = await client.query(userInsertText, [
        userData.email,
        userData.username,
        userData.first_name,
        userData.last_name,
      ]);
      const userId = userResult.rows[0].id;

      // Insert into hashpwd table
      const pwdInsertText = `
        INSERT INTO hashpwd (username, password) VALUES ($1, $2)
      `;
      await client.query(pwdInsertText, [userData.username, hashedPassword]);

      await client.query('COMMIT');

      return {
        id: userId,
        ...userData,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Find user by username (with password for login)
  static async findByUsername(username) {
    const query = `
      SELECT u.id, u.email, u.username, u.first_name, u.last_name,
             u.created_at, u.updated_at, h.password
      FROM users u
      LEFT JOIN hashpwd h ON u.username = h.username
      WHERE u.username = $1
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = `
      SELECT id, email, username, first_name, last_name, created_at, updated_at
      FROM users WHERE email = $1 LIMIT 1
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  // Get all users (without passwords)
  static async findAll(limit = 100, offset = 0) {
    const query = `
      SELECT id, email, username, first_name, last_name, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const { rows } = await pool.query(query, [limit, offset]);
    return rows;
  }

  // Get total count of users
  static async getTotalCount() {
    const query = 'SELECT COUNT(*) AS total FROM users';
    const { rows } = await pool.query(query);
    return parseInt(rows[0].total, 10);
  }

  // Find user by ID
  static async findById(id) {
    const query = `
      SELECT id, email, username, first_name, last_name, created_at, updated_at
      FROM users WHERE id = $1 LIMIT 1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Update user by ID
  static async updateById(id, userData) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Get current user username
      const currentUserResult = await client.query(
        'SELECT username FROM users WHERE id = $1',
        [id]
      );

      if (currentUserResult.rows.length === 0) {
        throw new Error('User not found');
      }

      const oldUsername = currentUserResult.rows[0].username;

      // Update users table
      const updateUserText = `
        UPDATE users SET email = $1, username = $2, first_name = $3, last_name = $4
        WHERE id = $5
      `;
      const updateResult = await client.query(updateUserText, [
        userData.email,
        userData.username,
        userData.first_name,
        userData.last_name,
        id,
      ]);

      if (updateResult.rowCount === 0) {
        throw new Error('User not found');
      }

      // If username changed, update hashpwd table
      if (userData.username !== oldUsername) {
        await client.query(
          'UPDATE hashpwd SET username = $1 WHERE username = $2',
          [userData.username, oldUsername]
        );
      }

      await client.query('COMMIT');

      // Return updated user
      return await User.findById(id);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete user by ID
  static async deleteById(id) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Delete user (assumes ON DELETE CASCADE on hashpwd for foreign key)
      const deleteResult = await client.query(
        'DELETE FROM users WHERE id = $1',
        [id]
      );

      await client.query('COMMIT');

      return deleteResult.rowCount > 0;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Check if username exists
  static async usernameExists(username, excludeId = null) {
    let query = 'SELECT COUNT(*) AS count FROM users WHERE username = $1';
    const params = [username];

    if (excludeId) {
      query += ' AND id != $2';
      params.push(excludeId);
    }

    const { rows } = await pool.query(query, params);
    return parseInt(rows[0].count, 10) > 0;
  }

  // Check if email exists
  static async emailExists(email, excludeId = null) {
    let query = 'SELECT COUNT(*) AS count FROM users WHERE email = $1';
    const params = [email];

    if (excludeId) {
      query += ' AND id != $2';
      params.push(excludeId);
    }

    const { rows } = await pool.query(query, params);
    return parseInt(rows[0].count, 10) > 0;
  }
}

module.exports = User;
