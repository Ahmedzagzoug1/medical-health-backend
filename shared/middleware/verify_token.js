const jwt = require('jsonwebtoken');
const AppError = require('../utils/app_error');
const asyncWrapper = require('../middleware/async_wrapper');
    const {ACCESS_TOKEN_SECRET}=require('../../config/app.config');
    const HttpStatusText=require('../utils/http_status_text');


const verifyToken = asyncWrapper(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log(req.headers.authorization);
token=req.headers.authorization.split(' ')[1];
console.log(token);
    }

//there is no token given 
    if (!token) {
        return next(new AppError(401, HttpStatusText.Unauthorized, ' token is required'));
    }

    try {
        // 3. Verify the access token
        const decoded = jwt.verify(token,ACCESS_TOKEN_SECRET);
        console.log(decoded);
        // 4. Attach the decoded payload (e.g., userId, role) to the request object
        req.user = decoded;
        
        next();
    } catch (error) {
        // 5. Handle specific JWT errors gracefully
        if (error.name === 'TokenExpiredError') {
            return next(new AppError(401,HttpStatusText.Unauthorized,'Token has expired'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError(401,HttpStatusText.Unauthorized,'Invalid token, authorization denied'));
        }
        
        // Fallback for any other unexpected errors
        return next(new AppError(401,HttpStatusText.Unauthorized,'Authentication failed'));
    }
});
module.exports = { verifyToken };