const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validator/auth.validator');
const userModel = require('../models/user.model');

const router = express.Router();
router.post('/login',authValidation.validateLogin,authController.login);
router.post('/register', 
authValidation.validateRegister,authController.register);


module.exports=router;
