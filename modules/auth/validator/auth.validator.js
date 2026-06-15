const express_validator = require('express-validator');
<<<<<<< Updated upstream
const { body, validationResult } = express_validator;
=======
const { body, oneOf } = express_validator; // استدعاء الـ oneOf للـ Login المزدوج
const { handleValidation } = require('../../../shared/middleware/handle_validation');
const  UserRole  = require('../../../shared/utils/user_role');
>>>>>>> Stashed changes

const userValidationSchema = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('age').isNumeric().withMessage('Age must be a number')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { userValidationSchema, validate };