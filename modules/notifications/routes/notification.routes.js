const app =require('express');

const {verifyToken}=require('../../../shared/middleware/verify_token');

const{getAllNotifications,getUnreadNotifications,readNotification,
    readAllNotification,deleteNotification,
    deleteAllNotification,updateToken,deleteToken,registerDevice}=require('../controllers/notifications.controller');

const router=app.Router();

router.get('/',verifyToken,getAllNotifications);
router.get('/unread-count',verifyToken,getUnreadNotifications);
router.patch('/:id/read',verifyToken,readNotification);
router.patch('/:id/read-all',verifyToken,readAllNotification);
router.delete('/:id',verifyToken,deleteNotification);
router.delete('/',verifyToken,deleteAllNotification);
router.post('/devices/register',verifyToken,registerDevice);
router.patch('/devices/token',verifyToken,updateToken);
router.delete('/devices/token',verifyToken,deleteToken);

module.exports=router;