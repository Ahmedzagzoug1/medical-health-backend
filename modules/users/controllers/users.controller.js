const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../../../shared/utils/app_error');
const asyncWrapper = require('../../../shared/middleware/async_wrapper');
const User = require('../../../models/user_model'); 
const HttpSatutus=require('../../../shared/utils/http_status');
const {verifyToken }= require('../../../shared/middleware/verify_token');
// 1. جلب بيانات الحساب
const getProfile = asyncWrapper(async (req, res, next) => {
 const decoded=verifyToken(req, res, next);
     const user = req.user; 
    
    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

// 2. تحديث بيانات الحساب
const updateProfile = asyncWrapper(async (req, res, next) => {
    const { name } = req.body; // تعديل الـ destructuring الخاطئ
    
    const decoded=verifyToken(req, res, next); // تأكد من جلب بيانات المستخدم بشكل صحيح من التوكن
    if (!decoded) {
        return next(new AppError('User not authenticated', 401));
    }
    const oldUser = await User.findByIdAndUpdate(decoded.id, { name },
         { new: true, runValidators: true });
    
    if (!oldUser) {
        return next(new AppError(HttpStatus.NOT_FOUND, 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: { user }
    });
}); // تم إغلاق القوس بشكل صحيح هنا

// 3. تغيير كلمة المرور
const changePassword = asyncWrapper(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const decoded=verifyToken(req, res, next); // تأكد من جلب بيانات المستخدم بشكل صحيح من التوكن
    if (!decoded) {
        return next(new AppError('User not authenticated', 401));
    }
    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return next(new AppError('Current password is incorrect', 401));
    }
    
    // ملاحظة: تأكد أن موديل المستخدم يحتوي على .pre('save') لعمل hash للكلمة الجديدة
    user.password = newPassword; 
    await user.save();
    
    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
    });
});

// 4. رفع الصورة الشخصية
const uploadAvatar = asyncWrapper(async (req, res, next) => { // تعديل خطأ إملائي في اسم الدالة
        const decoded = verifyToken(req, res, next); // تأكد من جلب بيانات المستخدم بشكل صحيح من التوكن
    
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError('User not found', 404));
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