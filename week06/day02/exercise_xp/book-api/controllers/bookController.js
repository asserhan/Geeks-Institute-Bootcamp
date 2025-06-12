const Book = require('../models/book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book
// @route   GET /api/books/:bookId
// @access  Public
const getBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Public
const createBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear } = req.body;
    
    // Validation
    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, and published year'
      });
    }

    // Validate publishedYear is a number
    if (isNaN(publishedYear) || publishedYear < 0) {
      return res.status(400).json({
        success: false,
        message: 'Published year must be a valid positive number'
      });
    }
    
    const book = await Book.create(title, author, parseInt(publishedYear));
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update book
// @route   PUT /api/books/:bookId
// @access  Public
const updateBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { title, author, publishedYear } = req.body;
    
    // Check if book exists
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Validation
    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, and published year'
      });
    }

    // Validate publishedYear is a number
    if (isNaN(publishedYear) || publishedYear < 0) {
      return res.status(400).json({
        success: false,
        message: 'Published year must be a valid positive number'
      });
    }
    
    const updatedBook = await Book.update(bookId, title, author, parseInt(publishedYear));
    
    res.status(200).json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:bookId
// @access  Public
const deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    
    const deletedBook = await Book.delete(bookId);
    
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};