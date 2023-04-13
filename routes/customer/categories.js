const express = require('express');
const { validation, categoryValidator } = require('../../validation/validation')

const router = express.Router();

const categoriesController = require('../../controllers/categories');

router.get('/', categoriesController.getAllCategories);
router.get('/categories/popularCategories', categoriesController.getPopularListOfCategories);
router.get('/:id', validation(categoryValidator.idParams), categoriesController.getCategoryById);

module.exports = router;
