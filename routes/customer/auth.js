const express = require('express');
const { usersController } = require('../../controllers/index');
const { validation, usersValidator } = require('../../validation/validation')
const router = express.Router();


router.post('/login',validation(usersValidator.loginUser), usersController.loginUser);
router.post('/sing-up',validation(usersValidator.createUser), usersController.createUser);



module.exports = router;
