const express = require('express');
const { authorsController } = require('../../controllers/index');
const { validation, authorValidator } = require('../../validation/validation')


const router = express.Router();

router.post('/', validation(authorValidator.createAuthor), authorsController.createNewAuthor);
router.get('/', authorsController.getAuthors);
router.get('/:authorId',validation(authorValidator.idParams), authorsController.getAuthorById);
router.patch('/:authorId',validation(authorValidator.updateAuthor), authorsController.updateAuthorById);
router.delete('/:authorId', validation(authorValidator.idParams), authorsController.deleteAuthorById);
router.get('/books/:authorId', validation(authorValidator.idParams), authorsController.getBooksByAuthor);

router.get('/authors/popularAuthors', authorsController.getPopularListOfAuthors); //Not tested

module.exports = router;
