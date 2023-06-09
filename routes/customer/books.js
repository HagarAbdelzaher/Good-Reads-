const express = require('express');
const booksController = require('../../controllers/books');
const { validation, bookValidator } = require('../../validation/validation')


const router = express.Router();


router.get('/', booksController.getAllBooks);
router.get('/category/:categoryId' , validation(bookValidator.categoryIdParams), booksController.getBooksByCategory);
router.get('/:id' , validation(bookValidator.idParams), booksController.getBookById);
router.get('/popular/books', booksController.getPopularListOfBooks);
router.get('/search/:query', validation(bookValidator.query), booksController.searchBooks);


module.exports = router;