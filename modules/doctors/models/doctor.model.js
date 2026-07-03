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
  availability:[{date: { type: Date, default: Date.now }, 
  slots: {
    type: [],
//varutilizing a subdocument schema for the time slots
    default: [
      { time: '09:00 AM - 09:30 AM', isBooked: false },
      { time: '09:30 AM - 10:00 AM', isBooked: false },
      { time: '10:00 AM - 10:30 AM', isBooked: false },
      { time: '10:30 AM - 11:00 AM', isBooked: false }
    ]
}}],
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