const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validator/auth.validator');
const userModel = require('../models/user.model');

const multer = require('multer');
const path = require('path');
const deskstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log('file original name: ' + file.originalname);
        const ex=path.extname(file.originalname);
                console.log('ex: ' + ex);

        const fileName ='user' + Date.now()+  ex;
        console.log('file Name 1: ' + fileName);
        cb(null,  fileName);
    },
 
}
);
const upload = multer({ storage: deskstorage ,
       fileFilter: function (req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
},limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
    
}
}
);
const router = express.Router();
router.post('/users/login',authValidation.validateLogin,authController.login);
router.post('/users/register', upload.single('avatar'), 
authValidation.validateRegister,authController.register);


module.exports=router;
