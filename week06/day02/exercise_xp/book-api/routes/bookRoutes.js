const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

const router = express.Router();

// Route: /api/books
router.route('/')
  .get(getAllBooks)
  .post(createBook);

// Route: /api/books/:bookId
router.route('/:bookId')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;