const AppError = require('../shared/utils/app_error');
const HttpStatusText = require('../shared/utils/http_status_text');
module.exports = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(new AppError(500, HttpStatusText.Error, error.message));
    }
  };
};