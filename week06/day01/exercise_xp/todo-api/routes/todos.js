const express = require('express');
const router = express.Router();


let todos = [
  { id: 1, title: 'Sample Task', description: 'This is a sample to-do item', completed: false },
  { id: 2, title: 'Learn Express.js', description: 'Complete the Express.js tutorial', completed: false }
];

let nextId = 3; 


router.get('/', (req, res) => {
  res.json({
    success: true,
    count: todos.length,
    data: todos
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'To-do item not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});


router.post('/', (req, res) => {
  const { title, description } = req.body;
  

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false
  };
  
  todos.push(newTodo);
  
  res.status(201).json({
    success: true,
    message: 'To-do item created successfully',
    data: newTodo
  });
});

// Update a to-do item by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'To-do item not found'
    });
  }
  
  const { title, description, completed } = req.body;
  
  // Update only provided fields
  if (title !== undefined) {
    todos[todoIndex].title = title.trim();
  }
  if (description !== undefined) {
    todos[todoIndex].description = description.trim();
  }
  if (completed !== undefined) {
    todos[todoIndex].completed = Boolean(completed);
  }
  
  res.json({
    success: true,
    message: 'To-do item updated successfully',
    data: todos[todoIndex]
  });
});

// Delete a to-do item by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'To-do item not found'
    });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'To-do item deleted successfully',
    data: deletedTodo
  });
});

module.exports = router;