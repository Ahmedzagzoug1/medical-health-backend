const bcrypt = require('bcrypt');
const AppError = require('../../../shared/utils/app_error');
const asyncWrapper = require('../../../shared/middleware/async_wrapper');
const User = require('../models/user.model'); 
const HttpStatusText = require('../../../shared/utils/http_status_text'); // تأكد من الاسم هنا لو بتستخدمه

const getProfile = asyncWrapper(async (req, res, next) => {
    //this user is get from verify token 
    const userId = req.user.id; 
    const user=await User.findById(userId);
    const userObject=user.toObject();
    res.status(200).json({
        status:HttpStatusText.Success|| 'success',
        data: {user: userObject }
    });
});

const updateProfile = asyncWrapper(async (req, res, next) => {
    const { name } = req.body;     
    console.log("Name received:", name);
console.log(req.user);
    //this user is get from verify token 
    const userId = req.user.id ; 
console.log('id',userId);
//find and update documentation
    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { name },
        { returnDocument: 'after', runValidators: true }
    );
    
    if (!updatedUser) {
        return next(new AppError(404, HttpStatusText.Fail, 'User not found'));
    }
    
    res.status(200).json({
        status:HttpStatusText.Success|| 'success',
        data: { user: updatedUser } 
        });
});

const changePassword = asyncWrapper(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id ;

    const user = await User.findById(userId).select('+password');
    if (!user) {
        return next(new AppError(404,  HttpStatusText.Fail, 'User not found'));
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return next(new AppError(400,  HttpStatusText.Fail, 'Current password is incorrect'));
    }
    
    user.password = newPassword; 
    await user.save();
    
    res.status(200).json({
        status:HttpStatusText.Success|| 'success',
        message: 'Password updated successfully'
    });
});

const uploadAvatar = asyncWrapper(async (req, res, next) => { 
    const userId = req.user.id ;
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError(404, HttpStatusText.Fail, 'User not found'));
    }
    console.log(req.file);

    user.avatar = req.file ? req.file.filename : user.avatar;
    console.log(user.avatar);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: HttpStatusText.Success||'success',
        data: {
            avatar: user.avatar
        }
    });
});
//admin 
const getAllUsers = asyncWrapper(async (req, res, next) => {
    console.log('start');
    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { password: 0, refreshToken: 0 })
                            .skip(skip)
                            .limit(limit);
console.log('users',users);
    const totalUsers = await User.countDocuments();
console.log('total users',totalUsers);
    res.status(200).json({
        status: HttpStatusText.SUCCESS||'success',
        totalUsers:totalUsers,
        data: { users }
    });
});

const getUserById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id, { password: 0, refreshToken: 0 });

    if (!user) {
        return next(new AppError(404, HttpStatusText.Fail || 'fail', 'User not found'));
    }

    res.status(200).json({
        status: HttpStatusText.SUCCESS,
        data: { user }
    });
});

const updateUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { name, role } = req.body; // الـ Admin يقدر يغير الـ role أو حالة الحساب مثلاً

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, role },
        { returnDocument: 'after', runValidators: true }
    ).select('-password -refreshToken');

    if (!updatedUser) {
        return next(new AppError(404, HttpStatusText.Fail || 'fail', 'User not found'));
    }

    res.status(200).json({
        status: HttpStatusText.SUCCESS ||'success',
        data: { user: updatedUser }
    });
});

// 4. حذف مستخدم نهائياً من الداتا بيز
const deleteUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return next(new AppError(404, HttpStatusText.Fail || 'fail', 'User not found'));
    }

    res.status(200).json({
        status: HttpStatusText.SUCCESS || 'success',
        data: null,
        message: 'User deleted successfully'
    });
});
module.exports = { getProfile, updateProfile, changePassword, uploadAvatar,getAllUsers,
    getUserById,updateUser,deleteUser
 };