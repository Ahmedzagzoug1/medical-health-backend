const jwt = require('jsonwebtoken');
const AppError = require('../utils/app_error');
const asyncWrapper = require('./async_wrapper');
const verifyToken = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1. Check if the Authorization header exists and follows the Bearer scheme
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Token is required', 401));
    }

    // 2. Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach the decoded payload (e.g., userId, role) to the request object
        req.user = decoded;
        
        next();
    } catch (error) {
        // 5. Handle specific JWT errors gracefully
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token has expired, please log in again', 401));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token, authorization denied', 401));
        }
        
        // Fallback for any other unexpected errors
        return next(new AppError('Authentication failed', 401));
    }
});
module.exports = { verifyToken };