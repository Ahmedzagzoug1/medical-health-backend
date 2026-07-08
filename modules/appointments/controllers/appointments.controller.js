const asyncHandler = require('../../../shared/middleware/async_wrapper');
const AppointmentModel = require('../models/appointments.model');
const HttpStatus = require('../../../shared/utils/http_status_text');
const AppError = require('../../../shared/utils/app_error');
const AppointmentStatus = require('../../../shared/utils/appointment_status');
const DoctorModel = require('../../doctors/models/doctor.model');
const User=require('../../users/models/user.model');
const DoctorDto = require('../Dtos/doctors.dto');
const AppointmentDto = require('../Dtos/appointments.dto');
const getMyAppointments = asyncHandler(async (req, res, next) => {
const patientId = req.user.id; // Assuming the authenticated user's ID is stored in req.user.id
if(!patientId){
  return next(new AppError(400,HttpStatus.BadRequest, 'Patient ID is required'));
}
  const appointments = await AppointmentModel.find({ patientId })
    .populate({
        path: "doctorId",
        populate: {
            path: "userId",
            select: "name avatar"
        }
    });
  const appointmentDtoResponse = appointments.map((appointment) => ({
  id: appointment._id,
  appointmentDate: appointment.appointmentDate,
  startTime: appointment.startTime,
  endTime: appointment.endTime,
  problem: appointment.problem,
  status: appointment.status,
  doctor: {
    id: appointment.doctorId._id,
    name: appointment.doctorId.userId.name ??'',
    avatar: appointment.doctorId.userId.avatar??'',
    specialty: appointment.doctorId.specialty,
    rating: appointment.doctorId.rating,
  },
}));
  res.status(200).json({
    status: HttpStatus.Success,
    message: 'Appointments retrieved successfully',
    results: appointments.length,
    data: {appointments: appointmentDtoResponse}
  });
});
/**
 * {
  "doctorId": "...",
  "appointmentDate": "2026-08-01",
  "startTime": "09:00",
  "endTime": "09:15",
  "problem": "Headache"
}
 */
const createAppointment = asyncHandler(async (req, res, next) => {
  const { doctorId, appointmentDate, startTime, endTime, problem, createdBy } = req.body;    
  const patientId = req.user.id; // Assuming the authenticated user's ID is stored in req.user.id
  if(!patientId){
    return next(new AppError(400, HttpStatus.BadRequest, 'Patient ID is required'));

  }
  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    return next(new AppError(404, HttpStatus.NotFound, 'Doctor not found'));
  }
  const existingAppointment = await AppointmentModel.findOne({
    doctorId,
    appointmentDate,
    startTime,
    endTime,
    status:{
   $ne: AppointmentStatus.Cancelled
}
  });
    if (existingAppointment) {
    return next(new AppError(409, HttpStatus.Conflict, 'Appointment already exists for the specified time slot'));
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of the day
  const appointmentDateObj = new Date(appointmentDate);
  appointmentDateObj.setHours(0, 0, 0, 0); // Set to the start of the day   
  if ( today > appointmentDateObj) {
    return next(new AppError(400, HttpStatus.BadRequest, 'Appointment date cannot be in the past'));
  }
 
const workingHour = doctor.workingHours.find(
    wh => wh.date.toISOString().split("T")[0] === appointmentDate
);

if (!workingHour) {
    return next(new AppError(404, HttpStatus.NotFound, "Doctor is not working on this day"));
}  

   newAppointment = new AppointmentModel({
    doctorId,
    patientId,
    appointmentDate,
    startTime,
    endTime,
    problem,
    status: AppointmentStatus.Pending, // Set the initial status to "pending"
    createdBy: createdBy || patientId, // Use the provided createdBy or default to the patientId
  });
  res.status(201).json({
    status: HttpStatus.Success,
    message: 'Appointment created successfully',
    data: await newAppointment.save(),
  });
});
const cancelAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const patientId = req.user.id;
  if(!patientId){
    return next(new AppError(400, HttpStatus.BadRequest, 'Patient ID is required'));
  }
  const appointment = await AppointmentModel.findOne({ _id: appointmentId, patientId });
  if (!appointment) {
    return next(new AppError(404, HttpStatus.NotFound, 'Appointment not found'));
  }
  appointment.status = AppointmentStatus.Cancelled;
  await appointment.save();
  res.status(200).json({
    status: HttpStatus.Success,
    message: 'Appointment cancelled successfully',
    data: appointment,
  });
});
const getAppointmentById = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const patientId = req.user.id;    
  if(!patientId){
    return next(new AppError(400, HttpStatus.BadRequest, 'Patient ID is required'));
  }
  const appointment = await AppointmentModel.findOne({ _id: appointmentId, patientId });
  if (!appointment) {
    return next(new AppError(404, HttpStatus.NotFound, 'Appointment not found'));
  }
  res.status(200).json({
    status: HttpStatus.Success,
    message: 'Appointment retrieved successfully',
    data: appointment,
  });
});
const updateAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const patientId = req.user.id;    
    if(!patientId){
    return next(new AppError(400, HttpStatus.BadRequest, 'Patient ID is required'));
        
    }
    const { appointmentDate, startTime, endTime, problem } = req.body;
  const appointment = await AppointmentModel.findOne({ _id: appointmentId, patientId });
    if (!appointment) {
    return next(new AppError(404, HttpStatus.NotFound, 'Appointment not found'));
    }
  // Update the appointment with the new values
  Object.assign(appointment, { appointmentDate, startTime, endTime, problem });
  await appointment.save();
  res.status(200).json({
    status: HttpStatus.Success,
    message: 'Appointment updated successfully',
    data: appointment,
  });
});
const getDoctorAppointments = asyncHandler(async (req, res, next) => {
  const doctorId = await doctor.findOne;
    if(!doctorId){
    return next(new AppError(400, HttpStatus.BadRequest, 'Doctor ID is required'));
    }
  const appointments = await AppointmentModel.find({ doctorId });
  res.status(200).json({
    status: HttpStatus.Success,
    message: 'Doctor appointments retrieved successfully',
    data: appointments,
  });
});
module.exports = {
  getMyAppointments,
  createAppointment,
    cancelAppointment,
    getAppointmentById,
    updateAppointment,
    getDoctorAppointments,
};