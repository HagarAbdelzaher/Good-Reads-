const express = require('express');
const { usersController } = require('../../controllers/index');
const { validation, usersValidator } = require('../../validation/validation');

const router = express.Router();



router.get('/getUser', usersController.getUserById);
router.get('/allUsers', usersController.getUsers);
router.delete('/:id', validation(usersValidator.idParams), usersController.deleteUserById);

module.exports = router;
