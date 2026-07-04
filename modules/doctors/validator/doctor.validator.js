const {handleValidation}=require('../../../shared/middleware/handle_validation');
const Gender=require('../../../shared/utils/gender');
const {body,validationResult,param,query}=require('express-validator');
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
//FOR WORKING HOURS
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const endTimeValidation = body("endTime").custom((endTime, { req }) => {
  if (req.body.startTime && endTime <= req.body.startTime) {
    throw new Error("End time must be after start time");
  }
  return true;
});

 const workingHoursValidation = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format")
 .withMessage("Date must be in YYYY-MM-DD format")
  .custom((value) => {
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      throw new Error("Date must be today or a future date");
    }

    return true;
  })
  .toDate(),
  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .matches(timeRegex)
    .withMessage("Start time must be in HH:mm format"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .matches(timeRegex)
    .withMessage("End time must be in HH:mm format"),

  endTimeValidation,

  body("slotDuration")
    .notEmpty()
    .withMessage("Slot duration is required")
    .isInt({ min: 5, max: 180 })
    .withMessage("Slot duration must be between 5 and 180 minutes"),

  handleValidation,
];

const updateWorkingHoursValidation = [
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format")
  .custom((value) => {
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      throw new Error("Date must be today or a future date");
    }

    return true;
  })
  .toDate(),

  body("startTime")
    .optional()
    .matches(timeRegex)
    .withMessage("Start time must be in HH:mm format"),

  body("endTime")
    .optional()
    .matches(timeRegex)
    .withMessage("End time must be in HH:mm format"),

  endTimeValidation,

  body("slotDuration")
    .optional()
    .isInt({ min: 5, max: 180 })
    .withMessage("Slot duration must be between 5 and 180 minutes"),

  body().custom((value) => {
    if (Object.keys(value).length === 0) {
      throw new Error("Request body cannot be empty");
    }
    return true;
  }),

    handleValidation,
];

 const availableSlotsValidation = [
  param("doctorId")
    .isMongoId()
    .withMessage("Invalid doctor id"),

  query("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format"),

  handleValidation,
];
module.exports={ createDoctorValidation,updateProfileValidation,workingHoursValidation,updateWorkingHoursValidation,
  availableSlotsValidation};
