const mongoose=require('mongoose');
const userDeviceSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    deviceId:{
        type:String,
        unique:true,
        require:true
    
    },deviceToken:{
        type:String,
         unique:true,
        require:true
    }, isActive:{
        type:Boolean,
        default:false
    }
},
{
    timeStamp:true
});
const UserDeviceModel=mongoose.model('UserDevice',userDeviceSchema);
module.exports =UserDeviceModel;