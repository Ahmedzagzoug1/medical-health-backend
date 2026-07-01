const User = require('../../users/models/user.model');
const asyncWrapper = require('../../../shared/middleware/async_wrapper');
const AppError = require('../../../shared/utils/app_error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatusText = require('../../../shared/utils/http_status_text');
const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET,NODE_ENV}=require('../../../config/app.config');
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

const accessToken = createAccessToken(user.id, user.email, user.role);
const refreshToken=createRefreshToken(user.id, user.email, user.role);
  const hashedToken = await bcrypt.hash(refreshToken, 10);

     await User.findByIdAndUpdate(user.id,{refreshToken:hashedToken} );

 user.password = undefined; // Remove password from the response
    user.__v = undefined; // Remove __v from the response
//for web
res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({status:HttpStatusText.Success,
      message: 'user login successful' ,data:{accessToken, refreshToken,user}
     });
    });
    

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, mobile, password, birthdate, role } = req.body;
console.log("البيانات اللي وصلت للـ Backend:", req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, mobile,password: hashedPassword, role, birthdate });


    await user.save();
  user.password = undefined; // Remove password from the response
    user.__v = undefined; // Remove __v from the response
const accessToken = createAccessToken(user.id, user.email, user.role);
const refreshToken=createRefreshToken(user.id, user.email, user.role);
  const hashedToken = await bcrypt.hash(refreshToken, 10);

 user.RefreshToken =  hashedToken; 
     await User.findByIdAndUpdate(user.id,{refreshToken:hashedToken} );

res.status(201).json({status:HttpStatusText.Success,message: 'User registered successfully' ,
    data:{accessToken, refreshToken,user} });
    });

const createAccessToken = (id, email, role) => {
    return jwt.sign({id, email, role },ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

const createRefreshToken = (id,email, role) => {
    return jwt.sign({id, email, role }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const refreshToken=asyncWrapper(async(req,res,next)=>{
  let token;

//cookies for web
    if (req.cookies && req.cookies.refreshToken) {
        token = req.cookies.refreshToken;
    } 
    //header in mobile
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

//there is no token given 
    if (!token) {
        return next(new AppError(401, HttpStatusText.Unauthorized, 'Refresh token is required'));
    }

    try {
console.log(token);
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
console.log(decoded);
        const user = await User.findById(decoded.userId);
        console.log(user.id);
        if (!user || !user.refreshToken) {
            return next(new AppError(403, HttpStatusText.Forbidden, 'Invalid refresh token'));
        }

        const isMatch = await bcrypt.compare(token, user.refreshToken);
        if (!isMatch) {
            return next(new AppError(403, HttpStatusText.Forbidden, 'Invalid refresh token'));
        }

        // 6. [Rotation] توليد توكنز جديدة تماماً
        const newAccessToken = createAccessToken(user.id, user.email,user.role);
        
        const newRefreshToken = createRefreshToken(user.id,user.email,user.role);

        user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
        await user.save();
//add refresh token to protect web from XSS attacks
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,                        
            secure: NODE_ENV === 'production',     
                 sameSite: 'Strict',                    
            maxAge: 7 * 24 * 60 * 60 * 1000         
        });

        res.status(200).json({
            status: HttpStatusText.Success,
            message: 'Tokens rotated successfully',
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken 
            }
        });

    } catch (error) {
        return next(new AppError(403, HttpStatusText.Forbidden, 'Refresh token expired or invalid'));
    }
});
const logout = asyncWrapper(async (req, res, next) => {
 

    try {
        
        await User.findByIdAndUpdate(req.user.id, { $unset: { refreshToken: 1 } });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        res.status(200).json({
            status: HttpStatusText.Success,
            message: 'Logged out successfully'
        });

    } catch (error) {
        return next(new AppError(400, HttpStatusText.BadRequest, 'Invalid token'));
    }
  });


module.exports={login,register,refreshToken,logout}; 
