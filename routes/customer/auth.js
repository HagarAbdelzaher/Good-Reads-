const express = require('express');
const { usersController } = require('../../controllers/index');
const { validation, usersValidator } = require('../../validation/validation')
const { validate } = require('express-validation')
const router = express.Router();


router.post('/login',validate(usersValidator.loginUser), usersController.loginUser);
router.post('/sing-up',validate(usersValidator.createUser), usersController.createUser);



module.exports = router;
