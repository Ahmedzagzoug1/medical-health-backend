const {verifyToken}=require('../../../shared/middleware/verify_token');
const HttpStatusText=require('../../../shared/utils/http_status_text');
const asyncWrapper=require('../../../shared/middleware/async_wrapper');
const Doctor=require('../models/doctor.model');
const User=require('../../users/models/user.model');
const Gender=require('../../../shared/utils/gender');
const {matchedData}=require('express-validator');


const getAllDoctors=asyncWrapper(async(req,res,next)=>{
<<<<<<< HEAD
const doctors=await Doctor.find({});
console.log(doctors.map((doctor)=>{
doctor.gender;
}));
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const doctors=await Doctor.find({});
=======
=======
>>>>>>> Stashed changes
>>>>>>> doctors

  const sorted={};
const {gender,rated}  =req.query;
const filter={};
if(gender !=null){
    filter.gender=gender;

<<<<<<< Updated upstream
console.log(doctors.map((doctor)=>{
doctor.gender;
}));
    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':doctors});
=======
}
if(rated =='1'){
sorted=1;
}
  const doctors=await Doctor.find(filter).sort(sorted);

    res.status(200).json({'status':HttpStatusText.Success,'message':'doctors get successfully',
        'results':doctors.length,
        'data':{doctors}});
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

const addDoctor=asyncWrapper(async(req,res,next)=>{
<<<<<<< Updated upstream
const{id,title,specialty,yearsOfExperience,focus,gander,profileDescription,careerPath,highlights}=req.body;
 
const user=await User.findById(id);
console.log(user._id);
const userObject=user.$toObject;
const doctor=new Doctor.create( user._id,title,specialty,yearsOfExperience,focus,gander,profileDescription,careerPath,highlights);
await doctor.save();   
=======
const{title,specialty,yearsOfExperience,focus,gender,profileDescription,careerPath,highlights}=req.body;
const userDecoded=req.user;
const doctor=await Doctor.create( {userId :userDecoded.id,title:title,
specialty:  specialty,yearsOfExperience: yearsOfExperience,
focus:focus,gender:gender,profileDescription:profileDescription,careerPath:careerPath,highlights:highlights});
>>>>>>> Stashed changes
console.log(doctor._id);
res.status(201).json({'status':HttpStatusText.Success,'message':'doctor \'s profile add successful','data':{doctor}});
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







module.exports={getAllDoctors,addDoctor,updateProfile,getProfile,setAvailability,
    getAvailability,getDoctorById};