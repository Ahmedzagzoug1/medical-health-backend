const {verifyToken}=require('../../../shared/middleware/verify_token');
const HttpStatusText=require('../../../shared/utils/http_status_text');
const asyncWrapper=require('../../../shared/middleware/async_wrapper');
const Doctor=require('../models/doctor.model');
const User=require('../../users/models/user.model');
const Gender=require('../../../shared/utils/gender');
const UserRole=require('../../../shared/utils/user_role');
const {matchedData}=require('express-validator');
const AppError=require('../../../shared/utils/app_error');
const {register}=require('../../auth/controllers/auth.controller');
const mongoose=require('mongoose');

const getAllDoctors=asyncWrapper(async(req,res,next)=>{


  const sorted={};
const {gender,rated}  =req.query;
const filter={};
if(gender !=null){
    filter.gender=gender;

const doctors=await Doctor.find(filter).sort(gender);

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':doctors});
}
if(rated =='1'){
sorted=1;
}
  const doctors=await Doctor.find(filter).sort(sorted);

    res.status(200).json({'status':HttpStatusText.Success,'message':'doctors get successfully',
        'results':doctors.length,
        'data':{doctors}});
});
const setAvailability=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});
const getAvailability=asyncWrapper(async(req,res,next)=>{
const {id}=req.params;
console.log(id);
const availability=await Doctor.findById(id,{'availability':1});
    res.status(200).json({'status':HttpStatusText.Success,'message':'data is successful','data':[availability]});
});
const getProfile=asyncWrapper(async(req,res,next)=>{
const id =req.user._id;
if(!id){
        return next(new AppError(401, HttpStatusText.Unauthorized, 'unautherizaed'));
}
const profile=await Doctor.findById(id);
res.status(200).json({'status':HttpStatusText.Success,'message':'response is successful','data':[profile]});
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


    res.status(200).json({'status':HttpStatusText.Success,'message':'updated successfully','data':[doctor]});
});

const createDoctor=asyncWrapper(async(req,res,next)=>{

const{  
    name,email,password,mobile,
    title,specialty,yearsOfExperience,focus,gender,profileDescription,careerPath,highlights}=req.body;
const session=await mongoose.startSession();
session.startTransaction();
try{ 
const user=await register(name,email,password,mobile,UserRole.DOCTOR,{session});
if(!user){
    await session.abortTransaction();
    session.endSession();
    return next(new AppError(400, HttpStatusText.BadRequest, 'user is not created'));
}

    const doctor=await Doctor.create( {userId :user._id,title,
specialty, yearsOfExperience,
focus,gender,profileDescription,careerPath,highlights},{session});
await session.commitTransaction();
session.endSession();
res.status(201).json({'status':HttpStatusText.Success,'message':'doctor \'s profile created successfully','data':{doctor}});
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        return next(error);
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
    res.status(200).json({'status':HttpStatusText.Success,'message':'doctor is exist','data':[doctor]});
});







module.exports={getAllDoctors,createDoctor,updateProfile,getProfile,setAvailability,
    getAvailability,getDoctorById};