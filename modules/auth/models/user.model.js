const {mongoose}=require('mongoose');
const validator = require('validator');
const userRole = require('../../../shared/utils/user_role');
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
    birthdate:{type:Date,required:true},
    password:{type:String,required:true,
        trim:true,
        select:false,
        validate : [validator.isLength, 'Password must be at least 6 characters long'
        ]            
    }},{
        timeStamp:true
    });

const User = mongoose.model('User', userSchema);
module.exports = User;