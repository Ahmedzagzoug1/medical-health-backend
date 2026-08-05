const async_wrapper=require('../../../shared/middleware/async_wrapper');
const Doctor=require('../../doctors/models/doctor.model');
const HttpstatusText=require('../../../shared/utils/http_status_text');
const AppError=require('../../../shared/utils/app_error'); 
const Patient = require('../models/patient.model');
const DoctorDto=require('../../doctors/dto/doctor.dto');
const Appoiment=require('../../appointments/models/appointments.model');
const Appointment = require('../../appointments/models/appointments.model');
const AppointmentStatus = require('../../../shared/utils/appointment_status');
const AppointmentDto = require('../dto/appiontment.dto');
const getFavoriteDoctors = async_wrapper(async (req, res, next) => {
    const userId = req.user.id;

    const patient = await Patient.findOne({ userId })
        .populate({
            path: "favoriteDoctors",
            populate: {
                path: "userId",
                select: "name avatar"
            }
        });

    if (!patient) {
        return next(
            new AppError(
                404,
                HttpstatusText.Fail,
                "Patient Not Found"
            )
        );
    }

    const doctors = patient.favoriteDoctors.map(doctor => DoctorDto(doctor));

    res.status(200).json({
        status: HttpstatusText.Success,
        message: "Favorite doctors fetched successfully",
        results:doctors.length,
        data: doctors
    });
});
const addFavoriteDoctor = async_wrapper(async (req, res, next) => {
    const { doctorId } = req.body;
    const userId = req.user.id;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
        return next(
            new AppError(
                404,
                HttpstatusText.Fail,
                "Doctor Not Found"
            )
        );
    }

    await Patient.findOneAndUpdate(
        { userId },
        {
            $addToSet: {
                favoriteDoctors: doctorId
            }
        },
        { new: true }
    );

    res.status(200).json({
        status: HttpstatusText.Success,
        message: "Doctor added to favorites successfully"
    });
});
const removeFavoriteDoctor = async_wrapper(async (req, res, next) => {
    const { doctorId } = req.body;
    const userId = req.user.id;

    await Patient.findOneAndUpdate(
        { userId },
        {
            $pull: {
                favoriteDoctors: doctorId
            }
        }
    );

    res.status(200).json({
        status: HttpstatusText.Success,
        message: "Doctor removed from favorites successfully"
    });
});
const getPatientAppointments = async ( req,res,next) => {
    const userId = req.user.id;
const status =req.query.status;
    const patient = await Patient.findOne({ userId });

   const appointments=await  Appointment.find({
        patientId: patient._id,
        status
    }).populate({
        path: "doctorId",
        populate: {
            path: "userId",
            select: "name avatar specialty rating"
        }
    });
    const appiontmentDtoResponse=appointments.map((appointment)=>AppointmentDto(appointment));
    res.status(200).json({'status':HttpstatusText.Success,'message':'data get successfully',
        'results':appiontmentDtoResponse.length,
'data':appiontmentDtoResponse
    
    });

};



module.exports={getFavoriteDoctors,addFavoriteDoctor,removeFavoriteDoctor,
    getPatientAppointments};