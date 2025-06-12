
require('dotenv').config();

const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;


console.log('Environment check:');
console.log('PORT:', process.env.PORT);
console.log('DB_NAME:', process.env.DB_NAME);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/books', bookRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Book API',
    version: '1.0.0',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books/:bookId': 'Get book by ID',
      'POST /api/books': 'Create new book',
      'PUT /api/books/:bookId': 'Update book by ID',
      'DELETE /api/books/:bookId': 'Delete book by ID'
    }
  });
});


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the API documentation`);
});