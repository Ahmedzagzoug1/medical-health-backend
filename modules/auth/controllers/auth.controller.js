const User = require('../../users/models/user.model');
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
        return next(new AppError( 401, HttpStatusText.Fail, 'Invalid email or password'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError(401, HttpStatusText.Fail, 'Invalid email or password'));
    }

    const token =createAccessToken(user.id, user.role);
    user.password = undefined; // Remove password from the response
    user.__v = undefined; // Remove __v from the response
    
    user.refreshToken=createRefreshToken(user.id ,role);
await user.save();
    res.status(200).json({status:HttpStatusText.Success,message: 'user login successful' ,data:{token,user} });

});

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, mobile, password, birthdate, role } = req.body;
console.log(name, email, mobile, password, birthdate, role );
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, mobile,password: hashedPassword, role, birthdate });
    console.log(user);

    await user.save();
        console.log(user);

    user.__v = undefined; // Remove __v from the response
    user.refreshToken=createRefreshToken(user.id ,role);
await user.save();
    const token = createAccessToken(user.id, user.role);
    res.status(201).json({status:HttpStatusText.Success,message: 'User registered successfully' ,
    data:{token,user} });
    });
const refreshToken =asyncWrapper((req,res,next)=>{

});
const logout=asyncWrapper((req,res,next)=>{

});
const createAccessToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const createRefreshToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports={login,register,refreshToken,logout}; 
