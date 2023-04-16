const express = require('express');
const { validation, categoryValidator } = require('../../validation/validation')
const categoriesController = require('../../controllers/categories');


const router = express.Router();


router.get('/', categoriesController.getAllCategories);
router.get('/categories/popularCategories', categoriesController.getPopularListOfCategories);
router.get('/:id', validation(categoryValidator.idParams), categoriesController.getCategoryById);


module.exports = router;