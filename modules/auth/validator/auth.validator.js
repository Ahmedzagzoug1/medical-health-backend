const express_validator = require('express-validator');
const { body, oneOf } = express_validator; // استدعاء الـ oneOf للـ Login المزدوج
const { handleValidation } = require('../../../shared/middleware/handle_validation');
const { UserRole } = require('../../../shared/utils/user_role');

const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('mobile').isMobilePhone().withMessage('Invalid mobile number'),
  body('birthdate').isDate().withMessage('Invalid birthdate'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(Object.values(UserRole)).withMessage('Invalid role'),
  handleValidation
];

const validateLogin = [
  oneOf([
    body('identifier').isEmail().withMessage('Invalid email address'),
    body('identifier').isMobilePhone().withMessage('Invalid mobile number')
  ], { message: 'Identifier must be a valid email or mobile number' }),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation
];

module.exports = { validateRegister, validateLogin };