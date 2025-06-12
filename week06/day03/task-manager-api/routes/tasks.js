const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { readTasks, writeTasks } = require('../utils/fileHelper');

// Helper function for error handling
const asyncHandler = (fn) => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

// GET all tasks
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
}));

// GET a specific task by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const tasks = await readTasks();
  const task = tasks.find(t => t.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
}));

// POST a new task
router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description || '',
    completed: req.body.completed || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const tasks = await readTasks();
  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
}));

// PUT (update) a task by ID
router.put('/:id', asyncHandler(async (req, res) => {
  const tasks = await readTasks();
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: req.body.title || tasks[taskIndex].title,
    description: req.body.description || tasks[taskIndex].description,
    completed: req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed,
    updatedAt: new Date().toISOString()
  };

  tasks[taskIndex] = updatedTask;
  await writeTasks(tasks);

  res.json(updatedTask);
}));

// DELETE a task by ID
router.delete('/:id', asyncHandler(async (req, res) => {
  const tasks = await readTasks();
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  await writeTasks(tasks);

  res.json(deletedTask[0]);
}));

module.exports = router;