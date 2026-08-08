const async_wrapper=require('../../../shared/middleware/async_wrapper');
const httpStatusText=require('../../../shared/utils/http_status_text');
const NotificationModel= require('../models/notification.model');
 const notificationService=require('../services/notification.service');
const getAllNotifications=async_wrapper((req,res,next)=>{
    const userId=req.user.id;
    const page=req.query.page || 1;
    const limit=req.query.limit || 20;
const {
        notifications,
        total,
        page,
        pages,
    }=   notificationService.findAll(userId, page, limit);

res.statusCode(200).json({'status':httpStatusText.Success,
        results:total,
        page:page,
        pages:pages,
        data:notifications,
        'message':'All Notifications get successful '

});
});
const readNotification=async_wrapper((req,res,next)=>{
        const userId=req.user.id;
        const {id}=req.params;
notificationService.markAsRead(id,userId);
res.statusCode(200).json({'status':httpStatusText.Success,'message':'read Notification successful '

});
});
const getUnreadNotifications=async_wrapper((req,res,next)=>{
        const user=req.user;
const unreadCount=await notificationService.getUnreadCount(user.id);
res.statusCode(200).json({'status':httpStatusText.Success,
        
        'message':'All unread Notifications get successful ','data':{'unreadCount':unreadCount}});

}); 
const readAllNotification=async_wrapper((req,res,next)=>{
        const user=req.user;
notificationService.markAllAsRead(user.id);
res.statusCode(200).json({'status':httpStatusText.Success,'message':'read All Notifications  successful '

});
});
const deleteNotification=async_wrapper((req,res,next)=>{
        const user=req.user;
                const {id}=req.params;

notificationService.delete(user.id, id);
res.statusCode(200).json({'status':httpStatusText.Success,'message':'delete Notification successful '

});
});
const deleteAllNotification=async_wrapper((req,res,next)=>{
        const user=req.user;
await notificationService.deleteAll(user.id);

res.statusCode(200).json({'status':httpStatusText.Success,'message':'delete All Notifications  successful '

});
});
const registerDevice=async_wrapper((req,res,next)=>{
        const user=req.user;
        const { deviceId, deviceToken } = req.body;

    const device=    await notificationService.registerDevice(user.id, deviceId, deviceToken);
if(device){
                res.statusCode(200).json({'status':httpStatusText.Success,'message':'Device registered successfully'});
}else{
res.statusCode(400).json({'status':httpStatusText.BadRequest,'message':'Device registration failed'});
}

});
const removeToken=async_wrapper((req,res,next)=>{
        const user=req.user;
        const { deviceToken } = req.body;

    const device=    await notificationService.removeToken(user.id, deviceToken);
if(device){
                res.statusCode(200).json({'status':httpStatusText.Success,'message':'Device token removed successfully'});
}else{
res.statusCode(400).json({'status':httpStatusText.BadRequest,'message':'Device token removal failed'});
}

});
const updateToken=async_wrapper((req,res,next)=>{
        const user=req.user;
        const { deviceId, deviceToken } = req.body;

    const device=    await notificationService.updateToken(user.id, deviceId, deviceToken);
if(device){
                res.statusCode(200).json({'status':httpStatusText.Success,'message':'Device token updated successfully'});
}else{
res.statusCode(400).json({'status':httpStatusText.BadRequest,'message':'Device token update failed'});
}
});

module.exports={getAllNotifications,getUnreadNotifications,readNotification,
    readAllNotification,deleteNotification,
    deleteAllNotification,updateToken,deleteToken,registerDevice};