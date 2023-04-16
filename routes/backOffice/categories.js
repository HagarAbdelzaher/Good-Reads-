const express = require('express');
const categoriesController = require('../../controllers/categories');
const { validation, categoryValidator } = require('../../validation/validation')


const router = express.Router();


router.get('/', categoriesController.getAllCategories);
router.get('/categories/popularCategories', categoriesController.getPopularListOfCategories);
router.get('/:id', validation(categoryValidator.idParams), categoriesController.getCategoryById);
router.post('/', validation(categoryValidator.createCategory), categoriesController.addNewCategory);
router.put('/:id', validation(categoryValidator.updateCategory), categoriesController.updateCategory);
router.delete('/:id',  validation(categoryValidator.idParams),categoriesController.deleteCategory);


module.exports = router;