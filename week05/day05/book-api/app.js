const express = require('express');
const app = express();

// Middleware to parse JSON body content
app.use(express.json());

// Basic data array containing book objects
let books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publishedYear: 1813
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publishedYear: 1951
  }
];

// Helper function to generate the next ID
function getNextId() {
  return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
}

// Helper function to find a book by ID
function findBookById(id) {
  return books.find(book => book.id === parseInt(id));
}

// READ ALL - GET /api/books
// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// READ - GET /api/books/:bookId
// Get a specific book by ID
app.get('/api/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const book = findBookById(bookId);
  
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// CREATE - POST /api/books
// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;
  
  // Basic validation
  if (!title || !author || !publishedYear) {
    return res.status(400).json({ 
      message: 'Missing required fields: title, author, and publishedYear are required' 
    });
  }
  
  // Create new book object with incremented ID
  const newBook = {
    id: getNextId(),
    title: title,
    author: author,
    publishedYear: parseInt(publishedYear)
  };
  
  // Add the new book to the books array
  books.push(newBook);
  
  // Return the new book with 201 Created status
  res.status(201).json(newBook);
});

// UPDATE - PUT /api/books/:bookId
// Update an existing book
app.put('/api/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  const { title, author, publishedYear } = req.body;
  
  // Basic validation
  if (!title || !author || !publishedYear) {
    return res.status(400).json({ 
      message: 'Missing required fields: title, author, and publishedYear are required' 
    });
  }
  
  // Update the book
  books[bookIndex] = {
    id: parseInt(bookId),
    title: title,
    author: author,
    publishedYear: parseInt(publishedYear)
  };
  
  res.status(200).json(books[bookIndex]);
});

// DELETE - DELETE /api/books/:bookId
// Delete a book
app.delete('/api/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  // Remove the book from the array
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.status(200).json({ 
    message: 'Book deleted successfully', 
    deletedBook: deletedBook 
  });
});

// Error handling for invalid routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Set up the app to listen on port 3001 (or any available port)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📚 Book API server is running on port ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📖 Available endpoints:`);
  console.log(`   GET    /api/books           - Get all books`);
  console.log(`   GET    /api/books/:bookId   - Get a specific book`);
  console.log(`   POST   /api/books           - Create a new book`);
  console.log(`   PUT    /api/books/:bookId   - Update a book`);
  console.log(`   DELETE /api/books/:bookId   - Delete a book`);
});

module.exports = app;