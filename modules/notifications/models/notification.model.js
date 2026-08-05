const mongoose=require('mongoose');
const notificationType=require('../../../shared/utils/notification_type');
const notificationSchema= mongoose.Schema({
userId:{
type:mongoose.Schema.ObjectId,
ref:'User',
index:true,
require:true
},
title:{
    type:String,
    require:true,
    trim:true,
    maxLenghth:100
},
body:{
    type:String,
    require:true,
    trim:true,
    maxLenghth:500
},
type:{
    type:String,
    enum:notificationType,
    require:true,
    index:true,
} ,
data :{type: mongoose.Schema.Types.Mixed,default:{}},
isRead:{type:Boolean,
    default:false,
    index:true
},
readAt : {type:Date, default:null},
image:String,
channel:String,
priority:String
},{
    timestamps:true,
    versionKey:false
});

const NotificationModel=mongoose.model('Notification',notificationSchema);
module.exports=NotificationModel;
