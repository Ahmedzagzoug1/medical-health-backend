const User = require('../../../models/user_model');
const asyncWrapper = require('../../../../shared/middleware/async_wrapper');
const AppError = require('../../../shared/utils/app_error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatusText = require('../../../../shared/utils/http_status_text');
const login = asyncWrapper(async (req, res, next) => {
    const { email, password,role } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError('Invalid email or password', 401));
    }
    const token = jwt.sign({ email: user.email,role: user.role },
         process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({status:HttpStatusText.Success,message: token });
});

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role,
         avatar:req.file ? req.file.filename : null });
    await user.save();
    res.status(201).json({status:HttpStatusText.Success,message: 'User registered successfully' });
});
module.exports={login,register}; 
