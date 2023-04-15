const express = require('express');
const { usersController } = require('../../controllers/index');
const { validation, usersValidator } = require('../../validation/validation')

const router = express.Router();

router.patch('/:id',  validation(usersValidator.updateUser),usersController.updateUserById);
router.get('/profile/', usersController.getUserById);
module.exports = router;
