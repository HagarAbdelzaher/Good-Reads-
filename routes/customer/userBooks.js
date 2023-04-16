const express = require('express');
const { validation, userBookValidator } = require('../../validation/validation');
const userBooksController = require('../../controllers/userBooks');


const router = express.Router();


router.post('/',validation(userBookValidator.addShelf) , userBooksController.addBook);
router.get('/:shelf',validation(userBookValidator.shelfParams), userBooksController.getUserBooks);
router.get('/book/:bookId',validation(userBookValidator.idParams) , userBooksController.getUserBookById);
router.patch('/add/review',validation(userBookValidator.addReview) , userBooksController.addReview);
router.patch('/shelf',validation(userBookValidator.updateShelf) , userBooksController.updateShelf);
router.patch('/rating',validation(userBookValidator.addRating), userBooksController.addRating);


module.exports = router;