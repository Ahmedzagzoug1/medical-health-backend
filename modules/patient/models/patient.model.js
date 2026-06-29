const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema({
userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', 
        required: true,
    unique: true
  },
}
);
const Patient=mongoose.model('Patient',patientSchema);
module.exports=Patient;