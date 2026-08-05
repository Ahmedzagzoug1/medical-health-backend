const NotificationModel = require("../models/notification.model");
const UserDeviceModel = require("../models/user_device.model");
const PushNotificationService = require("./push_notifications.service");
//create notification and send push notification
const create = async ({
    userId,
    title,
    body,
    type,
    data = {},
}) => {

    const notification = await NotificationModel.create({
        userId,
        title,
        body,
        type,
        data,
    });

    await PushNotificationService.sendToUser(
        userId,
        title,
        body,
        data
    );

    return notification;
};

const findAll = async (
    userId,
    page,
    limit 
) => {

    const skip = (page - 1) * limit;

    const notifications = await NotificationModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await NotificationModel.countDocuments({
        userId,
    });

    return {
        notifications,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
};

const findOne = async (notificationId, userId) => {

    return await NotificationModel.findOne({
        _id: notificationId,
        userId,
    });

};

const markAsRead = async (
    notificationId,
    userId
) => {

    return await NotificationModel.findOneAndUpdate(
        {
            _id: notificationId,
            userId,
        },
        {
            isRead: true,
            readAt: new Date(),
        },
        {
            new: true,
        }
    );

};

// تعليم كل الإشعارات كمقروءة
const markAllAsRead = async (userId) => {

    return await NotificationModel.updateMany(
        {
            userId,
            isRead: false,
        },
        {
            isRead: true,
            readAt: new Date(),
        }
    );

};

const remove = async (
    notificationId,
    userId
) => {

    return await NotificationModel.findOneAndDelete({
        _id: notificationId,
        userId,
    });

};

const deleteAll = async (userId) => {

    return await NotificationModel.deleteMany({
        userId,
    });

};

const getUnreadCount = async (userId) => {

    return await NotificationModel.countDocuments({
        userId,
        isRead: false,
    });

};
const registerDevice = async (
    userId,
    deviceId,
    deviceToken
) => {

    return await UserDeviceModel.findOneAndUpdate(
        {
            userId,
            deviceId,
        },
        {
            deviceToken,
            isActive: true,
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );

};
const removeToken = async (userId, deviceToken) => {
    return await UserDeviceModel.findOneAndUpdate(
        {
            userId, 
            deviceToken,
        },
        {
            isActive: false,
        },
        {
            new: true,
        }
    );
}
const updateToken = async (
    userId,
    deviceId,
    deviceToken
) => {

    return await UserDeviceModel.findOneAndUpdate(
        {
            userId,
            deviceId,
        },
        {
            deviceToken,
        },
        {
            new: true,
        }
    );

};
module.exports = {
    create,
    findAll,
    findOne,
    markAsRead,
    markAllAsRead,
    remove,
    deleteAll,
    getUnreadCount,
    registerDevice,
    removeToken,
    updateToken
};