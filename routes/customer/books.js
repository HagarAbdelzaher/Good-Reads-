const express = require('express');

const router = express.Router();

const booksController = require('../../controllers/books');
const { validation, bookValidator } = require('../../validation/validation')


router.get('/', booksController.getAllBooks);
router.get('/category/:categoryId', booksController.getBooksByCategory);
router.get('/:id', booksController.getBookById);
router.get('/popular/books', booksController.getPopularListOfBooks);
router.get('/search/:query', booksController.searchBooks);


module.exports = router;