const admin = require("firebase-admin");
const UserDeviceModel = require("../models/user_device.model");

const normalizeData = (data = {}) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      String(value),
    ])
  );
};

const sendToUser = async (
  userId,
  title,
  body,
  data = {}
) => {
  const devices = await UserDeviceModel.find({
    userId,
    isActive: true,
  }).lean();

  if (!devices.length) return null;

  const tokens = devices.map(
    (device) => device.deviceToken
  );

  return await sendToMultipleTokens(
    tokens,
    title,
    body,
    data
  );
};

const sendToMultipleUsers = async (
  userIds,
  title,
  body,
  data = {}
) => {
  const devices = await UserDeviceModel.find({
    userId: { $in: userIds },
    isActive: true,
  }).lean();

  if (!devices.length) return null;

  const tokens = devices.map(
    (device) => device.deviceToken
  );

  return await sendToMultipleTokens(
    tokens,
    title,
    body,
    data
  );
};

const sendToToken = async (
  token,
  title,
  body,
  data = {}
) => {
  const message = {
    token,

    notification: {
      title,
      body,
    },

    data: normalizeData(data),
  };

  return await admin.messaging().send(message);
};

const sendToMultipleTokens = async (
  tokens,
  title,
  body,
  data = {}
) => {
  if (!tokens?.length) return null;

  const message = {
    tokens,

    notification: {
      title,
      body,
    },

    data: normalizeData(data),
  };

  const response =
    await admin
      .messaging()
      .sendEachForMulticast(message);

  const invalidTokens = [];

  response.responses.forEach(
    (result, index) => {
      if (!result.success) {
        invalidTokens.push(tokens[index]);
      }
    }
  );

  if (invalidTokens.length) {
    await UserDeviceModel.deleteMany({
      deviceToken: {
        $in: invalidTokens,
      },
    });
  }

  return response;
};

const sendToTopic = async (
  topic,
  title,
  body,
  data = {}
) => {
  const message = {
    topic,

    notification: {
      title,
      body,
    },

    data: normalizeData(data),
  };

  return await admin.messaging().send(message);
};

const subscribeToTopic = async (
  topic,
  tokens
) => {
  return await admin
    .messaging()
    .subscribeToTopic(tokens, topic);
};

const unsubscribeFromTopic = async (
  topic,
  tokens
) => {
  return await admin
    .messaging()
    .unsubscribeFromTopic(tokens, topic);
};

module.exports = {
  sendToUser,
  sendToMultipleUsers,
  sendToToken,
  sendToMultipleTokens,
  sendToTopic,
  subscribeToTopic,
  unsubscribeFromTopic,
};