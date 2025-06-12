const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const { readUsers } = require('./utils/fileHelper');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize users file
async function initialize() {
  try {
    await readUsers();
    console.log('Users file initialized successfully');
  } catch (error) {
    console.error('Failed to initialize users file:', error);
    process.exit(1);
  }
}

// Routes
app.use('/', usersRouter);

// Serve HTML files
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, async () => {
  await initialize();
  console.log(`Server is running on http://localhost:${PORT}`);
});