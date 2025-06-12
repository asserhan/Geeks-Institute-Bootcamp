const express = require('express');
const tasksRouter = require('./routes/tasks');
const { readTasks } = require('./utils/fileHelper');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize tasks file
async function initialize() {
  try {
    await readTasks();
    console.log('Tasks file initialized successfully');
  } catch (error) {
    console.error('Failed to initialize tasks file:', error);
    process.exit(1);
  }
}

// Routes
app.use('/tasks', tasksRouter);

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