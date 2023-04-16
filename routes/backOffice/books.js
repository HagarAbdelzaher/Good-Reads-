const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/books');
const { validation, bookValidator } = require('../../validation/validation')


router.post('/', validation(bookValidator.createBook), booksController.addNewBook);
router.get('/', booksController.getAllBooks);
router.get('/:id', validation(bookValidator.idParams), booksController.getBookById);
router.get('/category/:categoryId', validation(bookValidator.categoryIdParams), booksController.getBooksByCategory);
router.patch('/:id', validation(bookValidator.updateBook), booksController.updateBook);
router.delete('/:id', validation(bookValidator.idParams), booksController.deleteBook);

router.get('/popular/books', booksController.getPopularListOfBooks);

module.exports = router;
