const async_wrapper=require('../../../shared/middleware/async_wrapper');
const httpStatusText=require('../../../shared/utils/http_status_text');
const NotificationModel= require('../models/notification.model');
const getAllNotifications=async_wrapper((req,res,next)=>{
    const userId=req.user.id;
  
    const notifications=await NotificationModel.find({userId});
res.statusCode(200).json({'status':httpStatusText.Success,'message':'All Notifications get successful '

});
});
const readNotification=async_wrapper((req,res,next)=>{
        const userId=req.user.id;
        const {id}=req.params;
    const notification=await NotificationModel.findAndUpdate({id, userId},{readAt:Date.now,isRead:true});

res.statusCode(200).json({'status':httpStatusText.Success,'message':'read Notification successful '

});
});
const getUnreadNotifications=async_wrapper((req,res,next)=>{
        const user=req.user;
    const unreadNotifications=await NotificationModel.find({userId,isRead:false});

res.statusCode(200).json({'status':httpStatusText.Success,'message':'All unread Notifications get successful '

});
});
const readAllNotification=async_wrapper((req,res,next)=>{
        const user=req.user;
    const unreadNotifications=await NotificationModel.findAndUpdate({userId,isRead:false},{isRead:true , readAt:Date.now});

res.statusCode(200).json({'status':httpStatusText.Success,'message':'read All Notifications  successful '

});
});
const deleteNotification=async_wrapper((req,res,next)=>{
        const user=req.user;
                const {id}=req.params;

await NotificationModel.Delete({userId,id});
res.statusCode(200).json({'status':httpStatusText.Success,'message':'delete Notification successful '

});
});
const deleteAllNotification=async_wrapper((req,res,next)=>{
        const user=req.user;
await NotificationModel.Delete({userId});

res.statusCode(200).json({'status':httpStatusText.Success,'message':'delete All Notifications  successful '

});
});


module.exports={getAllNotifications,getUnreadNotifications,readNotification,
    readAllNotification,deleteNotification,
    deleteAllNotification}