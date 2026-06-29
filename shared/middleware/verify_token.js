const jwt = require('jsonwebtoken');
const AppError = require('../utils/app_error');
const asyncWrapper = require('../middleware/async_wrapper');
    const appConfig=require('../../config/app.config');
    const HttpStatusText=require('../utils/http_status_text');
const verifyToken = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization;
const JWT_SECRET= process.env.JWT_SECRET;

    // 1. Check if the Authorization header exists and follows the Bearer scheme
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError(401,HttpStatusText.Unauthorized,'Token is required'));
    }

    // 2. Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token,JWT_SECRET);
        
        // 4. Attach the decoded payload (e.g., userId, role) to the request object
        req.user = decoded;
        
        next();
    } catch (error) {
        // 5. Handle specific JWT errors gracefully
        if (error.name === 'TokenExpiredError') {
            return next(new AppError(401,HttpStatusText.Unauthorized,'Token has expired, please log in again'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError(401,HttpStatusText.Unauthorized,'Invalid token, authorization denied'));
        }
        
        // Fallback for any other unexpected errors
        return next(new AppError(401,HttpStatusText.Unauthorized,'Authentication failed'));
    }
});
module.exports = { verifyToken };