const { validationResult } = require('express-validator');
const HttpStatusText = require('../utils/http_status_text');
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: HttpStatusText.BAD_REQUEST, errors: errors.array().map((error) => ({
      field: error.field,
      message: error.msg
    })) });
  }
  next();
};

module.exports = { handleValidation };