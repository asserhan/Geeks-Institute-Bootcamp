const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/todos', todosRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the To-Do List API!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;