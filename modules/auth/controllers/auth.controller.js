const User = require('../models/user.model');
const asyncWrapper = require('../../../shared/middleware/async_wrapper');
const AppError = require('../../../shared/utils/app_error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatusText = require('../../../shared/utils/http_status_text');
const login = asyncWrapper(async (req, res, next) => {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }],
        password: { $exists: true } }).select('+password');
    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError('Invalid email or password', 401));
    }
    const token =createAccessToken(user.email, user.role);
    user.password = undefined; // Remove password from the response
    res.status(200).json({status:HttpStatusText.Success,message: token ,data:{token,user} });
});

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, mobile, password, birthdate, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, mobile,password: hashedPassword, role, birthdate,
         avatar:req.file ? req.file.filename : null });
    await user.save();

    const token = createAccessToken(user.email, user.role);
user.token = token;
    res.status(201).json({status:HttpStatusText.Success,message: 'User registered successfully' ,
    data:{token,user}
    });
});
createAccessToken = (email, role) => {
    return jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
module.exports={login,register}; 
