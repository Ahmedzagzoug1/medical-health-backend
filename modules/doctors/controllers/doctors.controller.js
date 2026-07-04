const {verifyToken}=require('../../../shared/middleware/verify_token');
const HttpStatusText=require('../../../shared/utils/http_status_text');
const asyncWrapper=require('../../../shared/middleware/async_wrapper');
const Doctor=require('../models/doctor.model');
const User=require('../../users/models/user.model');
const Gender=require('../../../shared/utils/gender');
const UserRole=require('../../../shared/utils/user_role');
const {matchedData}=require('express-validator');
const AppError=require('../../../shared/utils/app_error');
const {registerService}=require('../../auth/controllers/auth.controller');
const mongoose=require('mongoose');
const doctorDto=require('../dto/doctor.dto');
const {userDto}=require('../../auth/dto/user.dto');
const getAllDoctors=asyncWrapper(async(req,res,next)=>{


  const sorted={};
const {gender,rating}  =req.query;
const filter={};
if(gender !=null){
    filter.gender=gender;

}
if(rating =='1'){
sorted={rating:1};
}
  const doctors=await Doctor.find(filter).sort(sorted);
const doctorDtoResponse = doctors.map(doctor => doctorDto(doctor));

    res.status(200).json({'status':HttpStatusText.Success,'message':'doctors get successfully',
        'results':doctors.length,
        'data':{doctors}});
});

const setWorkingHours=asyncWrapper(async(req,res,next)=>{
const userId=req.user.id;
const {date,startTime,endTime,slotDuration}=req.body;
console.log(userId,date,startTime,endTime,slotDuration);
const doctor=await Doctor.findOne({userId:userId});
console.log(doctor);
console.log(doctor.workingHours);
const exists = doctor.workingHours.some(
  (item) =>
    item.date.toISOString().split("T")[0] === date &&
    item.startTime === startTime &&
    item.endTime === endTime
);

if (exists) {
    return next(new AppError("Working hours already exist",409));
}
const doctorUpdate=await Doctor.findByIdAndUpdate(doctor._id,{$push: {workingHours: {date,startTime,endTime,slotDuration}}},
    {returnDocument:true,runValidators:true});
    res.status(200).json({'status':HttpStatusText.Success,'message':'add working hours','data':[doctorUpdate.workingHours]});
});
const getWorkingHours=asyncWrapper(async(req,res,next)=>{
const {id}=req.params;
console.log(id);
const workingHours=await Doctor.findById(id,{'workingHours':1});
    res.status(200).json({'status':HttpStatusText.Success,'message':'data is successful','data':workingHours});
});

const modifyWorkingHours=asyncWrapper(async(req,res,next)=>{
const userId=req.user.id;
const workingHourId=req.params.id;
const {date,startTime,endTime,slotDuration}=req.body;
const doctor=await Doctor.findOne({userId:userId});
const workingHour=doctor.workingHours.id(workingHourId);
if (!workingHour) {
    return next(new AppError("Working hour not found",404));
}
await Doctor.findOneAndUpdate({userId:userId},
    {$set:{'workingHours.$[elem].date':date,
        'workingHours.$[elem].startTime':startTime,'workingHours.$[elem].endTime':endTime,
        'workingHours.$[elem].slotDuration':slotDuration}},
{returnDocument:true,runValidators:true,arrayFilters:[{'elem._id':workingHourId}]});
res.status(200).json({'status':HttpStatusText.Success,'message':'update working hours','data':[doctor.workingHours]});
});
const deleteWorkingHours=asyncWrapper(async(req,res,next)=>{
const userId=req.user.id;
const workingHourId=req.params.id;
const doctor=await Doctor.findOneAndUpdate({userId:userId},{$pull:{workingHours:{_id:workingHourId}}},{new:true});
res.status(200).json({'status':HttpStatusText.Success,'message':'delete working hours','data':[doctor.workingHours]});
}); 
const getAvailableSlots=asyncWrapper(async(req,res,next)=>{
const doctorId=req.params.doctorId;
const {date}=req.query;
const doctor=await Doctor.findById(doctorId);
if(!doctor){
    return next(new AppError(404,HttpStatusText.NotFound,'Doctor not found'));
}
const workingHour=doctor.workingHours.find(wh=>wh.date.toISOString().split('T')[0]===date);
if(!workingHour){
    return next(new AppError(404,HttpStatusText.NotFound,'Working hours not found for the specified date'));
}
workingHour.startTime=workingHour.startTime.split(':');
workingHour.endTime=workingHour.endTime.split(':');
const startTime=new Date();
const soltDuration=workingHour.slotDuration;
  const slots = generateSlots(
    workingHour.startTime,
    workingHour.endTime,
    workingHour.slotDuration
  );

  res.status(200).json({
    status: HttpStatusText.Success,
    message: "Available slots",
    data: slots,
  });
});

const getDoctorProfile=asyncWrapper(async(req,res,next)=>{
const id =req.params.id;
if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
        new AppError(
            400,
            HttpStatusText.BadRequest,
            "Invalid doctor id"
        )
    );
}
const doctor=await Doctor.findById(id).populate('userId','name email mobile birthdate avatar role').lean();
if (!doctor) {
    return next(
        new AppError(
            404,
            HttpStatusText.NotFound,
            "Doctor not found"
        )
    );
}

const profile=doctorDto(doctor);

res.status(200).json({'status':HttpStatusText.Success,'message':'response is successful','data':profile});
});
const updateProfile=asyncWrapper(async(req,res,next)=>{
    Console.log('updated');
const id =req.user._id;
Console.log(id);
if(!id){
        return next(new AppError(401, HttpStatusText.Unauthorized, 'unautherizaed'));
}
Console.log(req.body);
//to prevent change the unallowed params 
const updates=matchedData(req.body); 
console.log(updates);
const doctor=Doctor.findByIdAndUpdate(id,updates,
    {new:true,
        runValidators:true
    }
);
const doctorDtoResponse = doctorDto(doctor);

    res.status(200).json({'status':HttpStatusText.Success,'message':'updated successfully','data':doctorDtoResponse});
});

const createDoctor=asyncWrapper(async(req,res,next)=>{

const{  
    name,email,password,mobile,birthdate,
    title,specialty,yearsOfExperience,focus,gender,profileDescription,careerPath,highlights}=req.body;
    console.log(req.body);

const session=await mongoose.startSession();
session.startTransaction();
try{ 
const { accessToken, refreshToken, user } = await registerService({name,email,password,mobile,birthdate,role:UserRole.DOCTOR}, {session});
if(!user){
    await session.abortTransaction();
    return next(new AppError(400, HttpStatusText.BadRequest, 'user is not created'));
}
const doctorData = {
    userId: user._id,
    title,
    specialty,
    yearsOfExperience,
    focus,
    gender,
    profileDescription,
    careerPath,
    highlights
};

const doctor = new Doctor(doctorData);

console.log(doctor);

const validationError = doctor.validateSync();

console.log(validationError);

await doctor.save({ session });
await session.commitTransaction();
res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    const userResponse = userDto(user);
const doctorDtoResponse = doctorDto(doctor);

res.status(201).json({
    status: HttpStatusText.Success,
    message: "Doctor profile created successfully",
    data: {
        doctor: doctorDtoResponse,
        user: userResponse,
        accessToken,
        refreshToken
    }
});
    }catch(error){
            if (session.inTransaction()) {

        await session.abortTransaction();
            }
        return next(error);
    }finally{
        session.endSession();
    }
});

const getDoctorById=asyncWrapper(async(req,res,next)=>{
const doctorId=req.params.id;
console.log(doctorId);
const doctor= await Doctor.findById(doctorId);
console.log(doctor);
if(!doctor){
 return res.status(404).json({'satatus':HttpStatusText.NotFound,'message':'Not Found'});
}
    const doctorDtoResponse = doctorDto(doctor);
    res.status(200).json({'status':HttpStatusText.Success,'message':'doctor is exist','data':doctorDtoResponse});
});


const generateSlots = (startTime, endTime, slotDuration) => {
  const slots = [];

  const toMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const toTime = (minutes) => {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    return `${h}:${m}`;
  };

  let current = toMinutes(startTime);
  const end = toMinutes(endTime);

  while (current + slotDuration <= end) {
    slots.push({
      startTime: toTime(current),
      endTime: toTime(current + slotDuration),
    });

    current += slotDuration;
  }

  return slots;
};
module.exports={getAllDoctors,createDoctor,updateProfile,getDoctorProfile,setWorkingHours,getWorkingHours,
    modifyWorkingHours,deleteWorkingHours,getAvailableSlots,
    getDoctorById};