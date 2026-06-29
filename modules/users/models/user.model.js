const mongoose=require('mongoose');
const validator = require('validator');
const userRole = require('../../../shared/utils/user_role');
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate : [validator.isEmail, 'Please provide a valid email']
    },
    mobile:{type:String,required:true,
        unique:true,
        trim:true,
        validate : [validator.isMobilePhone, 'Please provide a valid mobile number']
    },
    password:{type:String,required:true,
        trim:true,
        validate :{
            validator: (value) => {
                return validator.isLength(value, { min: 6 });
            },
            message: 'Password must be at least 6 characters long'
        },
        select:false
    },
    birthdate:{type:Date,required:true},
    refreshToken:{type:String, default:null},
    avatar:{type:String,
        default:'../../../uploads/avatar.png'},
        role:{type:String,enum:[userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT],
             default:userRole.PATIENT}
},{timestamps:true});



const User = mongoose.model('User', userSchema);
module.exports = User;