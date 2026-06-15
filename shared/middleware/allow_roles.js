const HttpStatusText = require('../utils/http_status_text');
module.exports = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            
            return res.status(403).json({
                status:HttpStatusText.Forbidden,
                message: 'Forbidden: You do not have access to this resource' });
        }
        next();
    };
};
