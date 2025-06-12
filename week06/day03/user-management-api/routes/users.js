const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { readUsers, writeUsers } = require('../utils/fileHelper');

const SALT_ROUNDS = 10;

// Helper function for error handling
const asyncHandler = (fn) => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

// POST /register - Register a new user
router.post('/register', asyncHandler(async (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  // Validate required fields
  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).json({ 
      message: 'All fields (name, lastName, email, username, password) are required' 
    });
  }

  const users = await readUsers();

  // Check if username or email already exists
  const usernameExists = users.some(user => user.username === username);
  const emailExists = users.some(user => user.email === email);

  if (usernameExists || emailExists) {
    return res.status(400).json({ 
      message: 'Username or email already exists' 
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    id: uuidv4(),
    name,
    lastName,
    email,
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeUsers(users);

  // Don't send password back in response
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({ 
    message: 'User registered successfully',
    user: userWithoutPassword
  });
}));

// POST /login - Login a user
router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      message: 'Username and password are required' 
    });
  }

  const users = await readUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ 
      message: 'Invalid username or password' 
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(401).json({ 
      message: 'Invalid username or password' 
    });
  }

  // Don't send password back in response
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({ 
    message: 'Login successful',
    user: userWithoutPassword
  });
}));

// GET /users - Get all users (for demonstration only)
router.get('/', asyncHandler(async (req, res) => {
  const users = await readUsers();
  // Remove passwords from response
  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.json(usersWithoutPasswords);
}));

// GET /users/:id - Get a specific user (for demonstration only)
router.get('/:id', asyncHandler(async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove password from response
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
}));

// PUT /users/:id - Update a user (for demonstration only)
router.put('/:id', asyncHandler(async (req, res) => {
  const users = await readUsers();
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, lastName, email } = req.body;
  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    lastName: lastName || users[userIndex].lastName,
    email: email || users[userIndex].email,
    updatedAt: new Date().toISOString()
  };

  users[userIndex] = updatedUser;
  await writeUsers(users);

  // Remove password from response
  const { password, ...userWithoutPassword } = updatedUser;
  res.json(userWithoutPassword);
}));

module.exports = router;