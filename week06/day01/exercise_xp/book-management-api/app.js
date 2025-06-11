const express = require('express');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/books', booksRouter);
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Book Management API!',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get a specific book',
      'POST /books': 'Create a new book',
      'PUT /books/:id': 'Update a book',
      'DELETE /books/:id': 'Delete a book'
    }
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});


app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


app.listen(PORT, () => {
  console.log(`📚 Book Management API is running on http://localhost:${PORT}`);
  console.log(`📖 Visit http://localhost:${PORT} to see available endpoints`);
});

module.exports = app;