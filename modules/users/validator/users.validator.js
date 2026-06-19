const express_validator=require('express-validator')
const { body} = express_validator; 
const { handleValidation } = require('../../../shared/middleware/handle_validation');
const  UserRole  = require('../../../shared/utils/user_role');
const changePasswordValidation= [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidation
]
module.exports={changePasswordValidation};
