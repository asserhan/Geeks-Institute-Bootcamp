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
