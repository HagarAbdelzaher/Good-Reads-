const express = require('express');
const { authorsController } = require('../../controllers/index');
const { validation, authorValidator } = require('../../validation/validation')


const router = express.Router();


router.get('/', authorsController.getPopularListOfAuthors);
router.get('/getAuthors', authorsController.getAuthors);
router.get('/books/:authorId',validation(authorValidator.idParams) , authorsController.getBooksByAuthor); 
router.get('/:authorId',validation(authorValidator.idParams) ,authorsController.getAuthorById);


module.exports = router;