const express = require('express');
const {login,register} = require('../controllers/auth.controller');
const authValidation = require('../validator/auth.validator');
const router = express.Router();
router.post('/login',authValidation.validateLogin,login);
router.post('/register', 
authValidation.validateRegister,register);

module.exports=router;
