const User = require('../models/user.model');
const asyncWrapper = require('../../../shared/middleware/async_wrapper');
const AppError = require('../../../shared/utils/app_error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatusText = require('../../../shared/utils/http_status_text');
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
<<<<<<< Updated upstream
    const token = jwt.sign({ email: user.email,role: user.role },
         process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({status:HttpStatusText.Success,message: token });
=======
    const token =createAccessToken(user.email, user.role);
    user.password = undefined; // Remove password from the response
    user.__v = undefined; // Remove __v from the response
    res.status(200).json({status:HttpStatusText.Success,message: 'user login successful' ,data:{token,user} });
>>>>>>> Stashed changes
});

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role,
         avatar:req.file ? req.file.filename : null });
<<<<<<< Updated upstream
    await user.save();
    res.status(201).json({status:HttpStatusText.Success,message: 'User registered successfully' });
});
=======

    await user.save();
  user.password = undefined; // Remove password from the response
    user.__v = undefined; // Remove __v from the response
    const token = createAccessToken(user.email, user.role);
    res.status(201).json({status:HttpStatusText.Success,message: 'User registered successfully' ,
    data:{token,user} });
    });

const createAccessToken = (email, role) => {
    return jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
>>>>>>> Stashed changes
module.exports={login,register}; 
