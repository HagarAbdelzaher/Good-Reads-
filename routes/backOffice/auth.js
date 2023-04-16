const express = require('express');
const { adminController } = require('../../controllers/index');
const { validation, adminValidator } = require('../../validation/validation')


const router = express.Router();


router.post('/login', validation(adminValidator.loginAdmin), adminController.loginAdmin);


module.exports = router;