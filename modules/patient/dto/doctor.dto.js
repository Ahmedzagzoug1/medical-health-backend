const { avatar } = require("../../appointments/Dtos/doctors.dto");

const doctorDto = (doctor) => ({
    id: doctor._id,
    userId: doctor.userId,
    title: doctor.title,
    specialty: doctor.specialty,
    
    avatar: doctor.avatar,
});

module.exports =  doctorDto ;