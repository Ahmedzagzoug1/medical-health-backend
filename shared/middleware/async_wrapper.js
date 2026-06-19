const AppError = require('../utils/app_error');
const HttpStatusText = require('../utils/http_status_text');
module.exports = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
return next(new AppError(401,HttpStatusText.Unauthorized,'not authentication or autherization '))
      }
      next(new AppError(500, HttpStatusText.Error, error.message));
    }
  };
};