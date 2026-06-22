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
/*
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
        required: true,
    unique: true
  },
  title: { 
    type: String, // like: Ph.D.
    trim: true 
  },
  specialty: {
    type: String, // like: Dermato-Genetics
    required: true,
    trim: true
  },
  
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  focus: {
    type: String, 
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {// to track the number of reviews for accurate rating calculation
    type: Number,
    default: 0
  },
  availability:{date: { type: Date, default: Date.now }, 
  slots: {
    type: [],
//varutilizing a subdocument schema for the time slots
    default: [
      { time: '09:00 AM - 09:30 AM', isBooked: false },
      { time: '09:30 AM - 10:00 AM', isBooked: false },
      { time: '10:00 AM - 10:30 AM', isBooked: false },
      { time: '10:30 AM - 11:00 AM', isBooked: false }
    ]
}},
  gender: {
    type: String, 
    enum: [Gender.MALE, Gender.FEMALE], // Ensure that the gender is either male or female
    required: true
  },
  profileDescription: {
    type: String,
    trim: true
  },
  careerPath: {
    type: String, 
    trim: true
  },
  highlights: {
    type: String, 
    trim: true
  }
}
*/


const addDoctor=asyncWrapper(async(req,res,next)=>{
const{userId,title,specialty,yearsOfExperience,focus,gander,profileDescription,careerPath,highlights}=req.body;
const doctor=Doctor.create(userId,title,specialty,yearsOfExperience,focus,gander,profileDescription,careerPath,highlights);
await doctor.save();   
res.status(201).json({'status':HttpStatusText.Success,'message':'doctor \'s profile add successful','data':{doctor}});
});
const getDoctorById=asyncWrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpStatusText.Success,'message':'','data':[]});
});







module.exports={getAllDoctors,addDoctor,updateProfile,getProfile,setAvailability,
    getAvailability,getDoctorById};