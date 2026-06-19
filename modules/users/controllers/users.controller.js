const bcrypt = require('bcrypt');
const AppError = require('../../../shared/utils/app_error');
const asyncWrapper = require('../../../shared/middleware/async_wrapper');
const User = require('../../auth/models/user.model'); 
const HttpSatutus = require('../../../shared/utils/http_status_text'); // تأكد من الاسم هنا لو بتستخدمه

// 1. جلب بيانات الحساب
const getProfile = asyncWrapper(async (req, res, next) => {
    // الـ verifyToken في الـ Routes جهزت الـ user هنا تلقائياً خلاص 😎
    const user = req.user; 
    
    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

// 2. تحديث بيانات الحساب
const updateProfile = asyncWrapper(async (req, res, next) => {
    const { name } = req.body;     
    console.log("Name received:", name);
console.log(req.user);
    // بنجيب الـ id من الـ req.user اللي جاية من الـ token middleware
    const userId = req.user.id ; 
console.log('id',userId);
    // تحديث البيانات وجلب المستخدم "بعد" التعديل باستخدام returnDocument
    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { name },
        { returnDocument: 'after', runValidators: true }
    );
    
    if (!updatedUser) {
        return next(new AppError(404, HttpSatutus.Fail, 'User not found'));
    }
    
    res.status(200).json({
        status: 'success',
        data: { user: updatedUser } // تعديل اسم المتغير هنا للصح
    });
});

// 3. تغيير كلمة المرور
const changePassword = asyncWrapper(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id ;

    const user = await User.findById(userId).select('+password');
    if (!user) {
        return next(new AppError(404,  HttpSatutus.Fail, 'User not found'));
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return next(new AppError(400,  HttpSatutus.Fail, 'Current password is incorrect'));
    }
    
    user.password = newPassword; 
    await user.save();
    
    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
    });
});

// 4. رفع الصورة الشخصية
const uploadAvatar = asyncWrapper(async (req, res, next) => { 
    const userId = req.user.id || req.user._id;
    
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError(404, HttpSatutus.Fail, 'User not found'));
    }
    
    user.avatar = req.file ? req.file.filename : user.avatar;
    await user.save();
    
    res.status(200).json({
        status: 'success',
        data: {
            avatar: user.avatar
        }
    });
});

module.exports = { getProfile, updateProfile, changePassword, uploadAvatar };