
const HttpStatusText = require('../utils/http_status_text');
const userRole=require('../utils/user_role');
module.exports = (...roles) => {
    return (req, res, next) => {
        // تأكد أن الـ verifyToken اشتغلت تمام وقرأت الـ req.user أولاً
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                status: HttpStatusText.UNAUTHORIZED || 'fail',
                message: 'Unauthorized: User role not found'
            });
        }

        const currentUserRole = req.user.role; // اسم واضح ومختلف

        if (!roles.includes(currentUserRole)) {
            return res.status(403).json({
                status: HttpStatusText.Forbidden || HttpStatusText.FAIL || 'fail',
                message: 'Forbidden: You do not have access to this resource' 
            });
        }
        next();
    };
};