const {mongoose}=require('mongoose');
const validator = require('validator');
<<<<<<< HEAD
const userRole = require('../../../shared/utils/user_role');
=======
const userRole = require('../shared/utils/user_role');
>>>>>>> master
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate : [validator.isEmail, 'Please provide a valid email']
    },
<<<<<<< HEAD
    birthdate:{type:Date,required:true},
    password:{type:String,required:true,
        trim:true,
        validate : [validator.isLength, 'Password must be at least 6 characters long'
        ]            
=======
    password:{type:String,required:true,
        trim:true,
        validate : [validator.isLength, 'Password must be at least 6 characters long'
            
        ]
>>>>>>> master
    },
    avatar:{type:String,
        default:'/uploads/avatar.png'},
        role:{type:String,enum:[userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT],
             default:userRole.PATIENT},
    expireAt:{type:Date,default:Date.now,expires:3600}
});

const User = mongoose.model('User', userSchema);
module.exports = User;