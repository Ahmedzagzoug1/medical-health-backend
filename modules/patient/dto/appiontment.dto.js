const AppointmentDto = (appointment) => ({
    id: appointment._id,
    appointmentDate: appointment.appointmentDate,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    problem: appointment.problem,
    status: appointment.status,
    doctor: {
        id: appointment.doctorId._id,
        name: appointment.doctorId.userId.name,
        avatar: appointment.doctorId.userId.avatar,
        specialty: appointment.doctorId.specialty,
        rating: appointment.doctorId.rating,
    },
});
module.exports=AppointmentDto;