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

const getAllDoctors=asyncWrapper(async(req,res,next)=>{

  const sorted={};
const {gender,rating}  =req.query;
const filter={};
if(gender !=null){
    filter.gender=gender;

<<<<<<< Updated upstream

console.log(doctors.map((doctor)=>{
doctor.gender;
}));
=======
>>>>>>> Stashed changes
}
if(rating =='1'){
sorted={rating:1};
}
  const doctors=await Doctor.find(filter).sort(sorted);
const doctorDtoResponse = doctors.map(doctor => doctorDto(doctor));

    res.status(200).json({'status':HttpStatusText.Success,'message':'doctors get successfully',
        'results':doctors.length,
<<<<<<< Updated upstream
        'data':{doctors}});

=======
        'data':{doctors: doctorDtoResponse}});
>>>>>>> Stashed changes
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
const session=await mongoose.startSession();
session.startTransaction();
try{ 
const { accessToken, refreshToken, user } = await registerService({name,email,password,mobile,birthdate,role:UserRole.DOCTOR}, {session});
if(!user){
    await session.abortTransaction();
    session.endSession();
    return next(new AppError(400, HttpStatusText.BadRequest, 'user is not created'));
}

    const doctor=await Doctor.create([ {userId :user._id,title,
specialty, yearsOfExperience,
focus,gender,profileDescription,careerPath,highlights}],{session});
await session.commitTransaction();
session.endSession();
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
    const doctorDtoResponse = doctorDto(doctor);
    res.status(200).json({'status':HttpStatusText.Success,'message':'doctor is exist','data':doctorDtoResponse});
});







module.exports={getAllDoctors,createDoctor,updateProfile,getDoctorProfile,setAvailability,
    getAvailability,getDoctorById};