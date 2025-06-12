const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {
  // Register new user
  static async register(req, res) {
    try {
      const { email, username, password, first_name, last_name } = req.body;

      // Validation
      if (!email || !username || !password || !first_name || !last_name) {
        return res.status(400).json({
          error: 'All fields are required',
          required: ['email', 'username', 'password', 'first_name', 'last_name']
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Password strength validation
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }

      // Username validation
      if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
      }

      // Check if username already exists
      const usernameExists = await User.usernameExists(username);
      if (usernameExists) {
        return res.status(409).json({ error: 'Username already exists' });
      }

      // Check if email already exists
      const emailExists = await User.emailExists(email);
      if (emailExists) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      // Hash password
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const userData = { email, username, first_name, last_name };
      const newUser = await User.create(userData, hashedPassword);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          first_name: newUser.first_name,
          last_name: newUser.last_name
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error during registration' });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validation
      if (!username || !password) {
        return res.status(400).json({
          error: 'Username and password are required'
        });
      }

      // Find user
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error during login' });
    }
  }

  // Get all users with pagination
  static async getAllUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const users = await User.findAll(limit, offset);
      const totalUsers = await User.getTotalCount();
      const totalPages = Math.ceil(totalUsers / limit);

      res.status(200).json({
        message: 'Users retrieved successfully',
        data: {
          users,
          pagination: {
            currentPage: page,
            totalPages,
            totalUsers,
            limit,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Internal server error while fetching users' });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Valid user ID is required' });
      }

      const user = await User.findById(parseInt(id));
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        user
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Internal server error while fetching user' });
    }
  }

  // Update user by ID
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, username, first_name, last_name } = req.body;

      // Validate ID
      if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Valid user ID is required' });
      }

      // Check if user exists
      const existingUser = await User.findById(parseInt(id));
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Validation
      if (!email || !username || !first_name || !last_name) {
        return res.status(400).json({
          error: 'All fields are required',
          required: ['email', 'username', 'first_name', 'last_name']
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Username validation
      if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
      }

      // Check if new username already exists (if different from current)
      if (username !== existingUser.username) {
        const usernameExists = await User.usernameExists(username, parseInt(id));
        if (usernameExists) {
          return res.status(409).json({ error: 'Username already exists' });
        }
      }

      // Check if new email already exists (if different from current)
      if (email !== existingUser.email) {
        const emailExists = await User.emailExists(email, parseInt(id));
        if (emailExists) {
          return res.status(409).json({ error: 'Email already exists' });
        }
      }

      // Update user
      const userData = { email, username, first_name, last_name };
      const updatedUser = await User.updateById(parseInt(id), userData);

      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Internal server error while updating user' });
    }
  }

  // Delete user by ID
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Valid user ID is required' });
      }

      // Check if user exists
      const existingUser = await User.findById(parseInt(id));
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete user
      const deleted = await User.deleteById(parseInt(id));
      
      if (deleted) {
        res.status(200).json({
          message: 'User deleted successfully',
          deletedUser: existingUser
        });
      } else {
        res.status(500).json({ error: 'Failed to delete user' });
      }
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Internal server error while deleting user' });
    }
  }
}

module.exports = UserController;
