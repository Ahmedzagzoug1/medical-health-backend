const UserDeviceModel=require('../models/user_device.model');
const NotificationModel=require('../models/notification.model');

const sendToUser=async(userId,title,body,data={})=>{
//getUsersDevice
const devices=await UserDeviceModel.find({userId,isActive:true});
if(!devices.length)return;
await NotificationModel.create({
userId:userId,title:title,body:body,data:data
});
const tokens=devices.map((device)=>device.deviceToken);
await sendToMultipuleTokens(tokens,userId,title,body,data
);
}
const sendToMultipuleUsers=()=>{

}
const sendToToken=(token,title,body,data={})=>{
const message={token,notification:{
   title:title,body:body,data:data 
}};
//send
}
const sendToMultipuleTokens=(tokens,userId,title,body,data={})=>{

}
const sendToTopic=(topic,title,body,data)=>{
const message={topic,notification:{
   title:title,body:body,data:data 
}};
//messaging
}
const subscribeTopic=(topic,tokens)=>{
//messaging subscripe
}
const unsubscribeTopic=(topic,tokens)=>{
//messaging unsubscripe

}
module.exports={sendToUser,sendToMultipuleUsers,sendToToken,sendToMultipuleTokens,
    sendToTopic,subscribeTopic,unsubscribeTopic
};
