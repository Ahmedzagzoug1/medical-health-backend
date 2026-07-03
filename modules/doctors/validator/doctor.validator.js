const {handleValidation}=require('../../../shared/middleware/handle_validation');
const Gender=require('../../../shared/utils/gender');
const {body,validationResult}=require('express-validator');
const createDoctorValidation=[
     body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('mobile').isMobilePhone().withMessage('Invalid mobile number'),
  body('birthdate').isDate().withMessage('Invalid birthdate'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
body('gender').isIn(Object.values(Gender)).withMessage('Gender must be MALE or FEMAILE'),
body('yearsOfExperience').isInt().withMessage('yearsOfExperience must be integer'),
handleValidation
];
//{id,title,specialty,yearsOfExperience,focus,gander,profileDescription,careerPath,highlights}
//{title,specialty,yearsOfExperience,focus,profileDescription,careerPath,highlights}
const updateProfileValidation=[
body('title').optional().isString,
body('yearsOfExperience').optional().isNumeric,
body('specialty').optional().isString,
body('gender').optional().isIn(Object.values(Gender)).withMessage(('Gender must be MALE or FEMAILE')),
body('focus').optional().isString,
body('profileDescription').optional().isString,
body('careerPath').optional().isString,


body('highlights').optional().isString,



handleValidation
];
module.exports={ createDoctorValidation,updateProfileValidation};