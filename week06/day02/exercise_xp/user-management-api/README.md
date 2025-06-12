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
