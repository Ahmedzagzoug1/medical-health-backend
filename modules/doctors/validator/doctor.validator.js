const {handleValidation}=require('../../../shared/middleware/handle_validation');
const Gender=require('../../../shared/utils/gender');
const {body,validationResult}=require('express-validator');
const ProfileValidation=[
body('gender').isIn(Object.values(Gender)).withMessage('Gender must be MALE or FEMAILE'),
body('yearsOfExperience').isInt().withMessage('yearsOfExperience must be integer'),
handleValidation
];
//{id,title,specialty,yearsOfExperience,focus,gander,profileDescription,careerPath,highlights}
module.exports={ ProfileValidation};