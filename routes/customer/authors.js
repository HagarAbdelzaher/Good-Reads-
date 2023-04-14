const express = require('express');
const { authorsController } = require('../../controllers/index');
const { validation, authorValidator } = require('../../validation/validation')

const router = express.Router();

router.get('/', authorsController.getPopularListOfAuthors); // Not tested
router.get('/getAuthors', authorsController.getAuthors);
router.get('/books/:authorId',  authorsController.getBooksByAuthor); 
router.get('/:authorId', authorsController.getAuthorById);

module.exports = router;
