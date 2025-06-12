#!/bin/bash

# User Management API Project Setup Script
# This script creates the complete directory structure and all necessary files

echo "🚀 Setting up User Management API project..."

# Create main project directory
PROJECT_NAME="user-management-api"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p server/config
mkdir -p server/controllers
mkdir -p server/models
mkdir -p server/routes

echo "✅ Directory structure created successfully!"

# Create package.json
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "user-management-api",
  "version": "1.0.0",
  "description": "User Management API with registration and login",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node server/config/initDB.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "bcrypt": "^5.1.0",
    "mysql2": "^3.6.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["express", "mysql", "bcrypt", "user-management", "api"],
  "author": "Your Name",
  "license": "MIT"
}
EOF

# Create .env file
echo "🔐 Creating .env file..."
cat > .env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=user_management

# Server Configuration
PORT=3000
NODE_ENV=development

# Security
BCRYPT_SALT_ROUNDS=10
EOF

# Create .gitignore
echo "🚫 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF

# Create main server.js
echo "🖥️ Creating server.js..."
cat > server.js << 'EOF'
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./server/routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (basic)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;
EOF

# Create database configuration
echo "🗄️ Creating database configuration..."
cat > server/config/database.js << 'EOF'
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'user_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection function
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    console.log(`📊 Connected to database: ${dbConfig.database} at ${dbConfig.host}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize connection test
testConnection();

module.exports = pool;
EOF

# Create database initialization script
echo "🔧 Creating database initialization script..."
cat > server/config/initDB.js << 'EOF'
const pool = require('./database');

const initializeDatabase = async () => {
  try {
    console.log('🔧 Initializing database tables...');

    // Create users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Users table created/verified');

    // Create hashpwd table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS hashpwd (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES users(username) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Hashpwd table created/verified');
    console.log('🎉 Database tables initialized successfully!');
    
    // Show table info
    const [usersTables] = await pool.execute('SHOW TABLES LIKE "users"');
    const [hashpwdTables] = await pool.execute('SHOW TABLES LIKE "hashpwd"');
    
    console.log(`📊 Tables found: users(${usersTables.length}), hashpwd(${hashpwdTables.length})`);
    
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
EOF

# Create User model
echo "📋 Creating User model..."
cat > server/models/User.js << 'EOF'
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
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Insert into users table
      const [userResult] = await connection.execute(
        'INSERT INTO users (email, username, first_name, last_name) VALUES (?, ?, ?, ?)',
        [userData.email, userData.username, userData.first_name, userData.last_name]
      );

      // Insert into hashpwd table
      await connection.execute(
        'INSERT INTO hashpwd (username, password) VALUES (?, ?)',
        [userData.username, hashedPassword]
      );

      await connection.commit();
      
      return {
        id: userResult.insertId,
        ...userData
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Find user by username (with password for login)
  static async findByUsername(username) {
    const [rows] = await pool.execute(
      `SELECT u.id, u.email, u.username, u.first_name, u.last_name, 
              u.created_at, u.updated_at, h.password 
       FROM users u 
       LEFT JOIN hashpwd h ON u.username = h.username 
       WHERE u.username = ?`,
      [username]
    );
    return rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Get all users (without passwords)
  static async findAll(limit = 100, offset = 0) {
    const [rows] = await pool.execute(
      `SELECT id, email, username, first_name, last_name, created_at, updated_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  // Get total count of users
  static async getTotalCount() {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM users');
    return rows[0].total;
  }

  // Find user by ID
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Update user by ID
  static async updateById(id, userData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Get current user data
      const [currentUser] = await connection.execute(
        'SELECT username FROM users WHERE id = ?',
        [id]
      );

      if (currentUser.length === 0) {
        throw new Error('User not found');
      }

      const oldUsername = currentUser[0].username;

      // Update users table
      const [result] = await connection.execute(
        'UPDATE users SET email = ?, username = ?, first_name = ?, last_name = ? WHERE id = ?',
        [userData.email, userData.username, userData.first_name, userData.last_name, id]
      );

      if (result.affectedRows === 0) {
        throw new Error('User not found');
      }

      // If username changed, update hashpwd table
      if (userData.username !== oldUsername) {
        await connection.execute(
          'UPDATE hashpwd SET username = ? WHERE username = ?',
          [userData.username, oldUsername]
        );
      }

      await connection.commit();
      
      // Return updated user
      const updatedUser = await User.findById(id);
      return updatedUser;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Delete user by ID
  static async deleteById(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Delete from users table (hashpwd will be deleted automatically due to CASCADE)
      const [result] = await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );

      await connection.commit();
      
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Check if username exists
  static async usernameExists(username, excludeId = null) {
    let query = 'SELECT COUNT(*) as count FROM users WHERE username = ?';
    let params = [username];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    const [rows] = await pool.execute(query, params);
    return rows[0].count > 0;
  }

  // Check if email exists
  static async emailExists(email, excludeId = null) {
    let query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
    let params = [email];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    const [rows] = await pool.execute(query, params);
    return rows[0].count > 0;
  }
}

module.exports = User;
EOF

# Create User controller
echo "🎮 Creating User controller..."
cat > server/controllers/userController.js << 'EOF'
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
EOF

# Create routes
echo "🛣️ Creating routes..."
cat > server/routes/userRoutes.js << 'EOF'
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// User authentication routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// User CRUD routes
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Route documentation
router.get('/routes', (req, res) => {
  res.json({
    message: 'User Management API Routes',
    routes: {
      'POST /api/register': 'Register a new user',
      'POST /api/login': 'Login user',
      'GET /api/users': 'Get all users (with pagination)',
      'GET /api/users/:id': 'Get user by ID',
      'PUT /api/users/:id': 'Update user by ID',
      'DELETE /api/users/:id': 'Delete user by ID'
    },
    examples: {
      register: {
        method: 'POST',
        url: '/api/register',
        body: {
          email: 'user@example.com',
          username: 'johndoe',
          password: 'securepassword',
          first_name: 'John',
          last_name: 'Doe'
        }
      },
      login: {
        method: 'POST',
        url: '/api/login',
        body: {
          username: 'johndoe',
          password: 'securepassword'
        }
      }
    }
  });
});

module.exports = router;
EOF

# Create README.md
echo "📖 Creating README.md..."
cat > README.md << 'EOF'
# User Management API

A complete Node.js/Express.js API for user management with registration, login, and CRUD operations.

## 🚀 Features

- ✅ User registration with password hashing (bcrypt)
- ✅ User login with password verification
- ✅ Get all users with pagination
- ✅ Get user by ID
- ✅ Update user information
- ✅ Delete user
- ✅ Database transactions for data integrity
- ✅ Comprehensive error handling and validation
- ✅ Input sanitization and security
- ✅ RESTful API design

## 📁 Project Structure

```
user-management-api/
├── server/
│   ├── config/
│   │   ├── database.js      # Database configuration
│   │   └── initDB.js        # Database initialization
│   ├── controllers/
│   │   └── userController.js # Business logic
│   ├── models/
│   │   └── User.js          # User model
│   └── routes/
│       └── userRoutes.js    # API routes
├── server.js                # Main server file
├── package.json
├── .env                     # Environment variables
├── .gitignore
└── README.md
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### HashPwd Table
```sql
CREATE TABLE hashpwd (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## ⚙️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=user_management
PORT=3000
```

### 3. Setup MySQL Database
```sql
CREATE DATABASE user_management;
```

### 4. Initialize Database Tables
```bash
npm run init-db
# or
node server/config/initDB.js
```

### 5. Start the Server
```bash
# Production
npm start

# Development (with nodemon)
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication

#### POST /api/register
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### POST /api/login
Authenticate user login.

**Request:**
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### User Management

#### GET /api/users
Get all users with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "message": "Users retrieved successfully",
  "data": {
    "users": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "limit": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET /api/users/:id
Get user by ID.

**Response:**
```json
{
  "message": "User retrieved successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/users/:id
Update user information.

**Request:**
```json
{
  "email": "newemail@example.com",
  "username": "newusername",
  "first_name": "Jane",