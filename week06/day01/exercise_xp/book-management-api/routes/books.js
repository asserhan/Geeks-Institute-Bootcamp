const express = require('express');
const router = express.Router();

// Sample in-memory database for storing books
let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    publishedYear: 1925,
    genre: 'Fiction',
    pages: 180,
    available: true
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    publishedYear: 1960,
    genre: 'Fiction',
    pages: 324,
    available: true
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    publishedYear: 1949,
    genre: 'Dystopian Fiction',
    pages: 328,
    available: false
  }
];

let nextId = 4; 


router.get('/', (req, res) => {
  const { genre, author, available } = req.query;
  let filteredBooks = books;


  if (genre) {
    filteredBooks = filteredBooks.filter(book => 
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }
  
  if (author) {
    filteredBooks = filteredBooks.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  
  if (available !== undefined) {
    const isAvailable = available.toLowerCase() === 'true';
    filteredBooks = filteredBooks.filter(book => book.available === isAvailable);
  }

  res.json({
    success: true,
    count: filteredBooks.length,
    totalBooks: books.length,
    data: filteredBooks
  });
});


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.json({
    success: true,
    data: book
  });
});

// Add a new book
router.post('/', (req, res) => {
  const { title, author, isbn, publishedYear, genre, pages, available } = req.body;
  
  // Validation
  const errors = [];
  if (!title || title.trim() === '') errors.push('Title is required');
  if (!author || author.trim() === '') errors.push('Author is required');
  if (!isbn || isbn.trim() === '') errors.push('ISBN is required');
  if (!publishedYear || !Number.isInteger(publishedYear)) errors.push('Valid published year is required');
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }
  
  // Check if ISBN already exists
  const existingBook = books.find(b => b.isbn === isbn.trim());
  if (existingBook) {
    return res.status(400).json({
      success: false,
      message: 'A book with this ISBN already exists'
    });
  }
  
  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
    isbn: isbn.trim(),
    publishedYear: parseInt(publishedYear),
    genre: genre ? genre.trim() : 'Unknown',
    pages: pages ? parseInt(pages) : null,
    available: available !== undefined ? Boolean(available) : true
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// Update a book by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author, isbn, publishedYear, genre, pages, available } = req.body;
  
  // If ISBN is being updated, check for duplicates
  if (isbn && isbn.trim() !== books[bookIndex].isbn) {
    const existingBook = books.find(b => b.isbn === isbn.trim() && b.id !== id);
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists'
      });
    }
  }
  
  // Update only provided fields
  if (title !== undefined && title.trim() !== '') {
    books[bookIndex].title = title.trim();
  }
  if (author !== undefined && author.trim() !== '') {
    books[bookIndex].author = author.trim();
  }
  if (isbn !== undefined && isbn.trim() !== '') {
    books[bookIndex].isbn = isbn.trim();
  }
  if (publishedYear !== undefined && Number.isInteger(publishedYear)) {
    books[bookIndex].publishedYear = parseInt(publishedYear);
  }
  if (genre !== undefined) {
    books[bookIndex].genre = genre.trim() || 'Unknown';
  }
  if (pages !== undefined) {
    books[bookIndex].pages = pages ? parseInt(pages) : null;
  }
  if (available !== undefined) {
    books[bookIndex].available = Boolean(available);
  }
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});
router.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre;
  const filteredBooks = books.filter(book => 
    book.genre.toLowerCase().includes(genre.toLowerCase())
  );
  
  res.json({
    success: true,
    genre: genre,
    count: filteredBooks.length,
    data: filteredBooks
  });
});


router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const filteredBooks = books.filter(book => 
    book.author.toLowerCase().includes(author.toLowerCase())
  );
  
  res.json({
    success: true,
    author: author,
    count: filteredBooks.length,
    data: filteredBooks
  });
});

module.exports = router;