const {verifyToken}=require('../../../shared/middleware/verify_token');
const HttpStatusText=require('../../../shared/utils/http_status_text');
const asyncWrapper=require('../../../shared/middleware/async_wrapper');
const Doctor=require('../models/doctor.model');
const getAllDoctors=asyncWrapper(async(req,res,next)=>{
const doctors=await Doctor.find({});
console.log(doctors.map((doctor)=>{
doctor.gender;
}));
    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':doctors});
});
const setAvailability=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});
const getAvailability=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});
const getProfile=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});
const updateProfile=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});
const addDoctor=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});
const getDoctorById=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});







module.exports={getAllDoctors,addDoctor,updateProfile,getProfile,setAvailability,
    getAvailability,getDoctorById};