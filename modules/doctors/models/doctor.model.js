const mongoose = require('mongoose');
const Gender=require('../../../shared/utils/gender');
const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
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
  workingHours:[{date: { type: Date, default: Date.now }, 
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
slotDuration:{
  type:Number,
  default:30
}},],
  
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
, {
  timestamps: true 
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports=Doctor;