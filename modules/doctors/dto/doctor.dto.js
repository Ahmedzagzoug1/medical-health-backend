const doctorDto = (doctor) => ({
    id: doctor._id,
    userId: doctor.userId,
    title: doctor.title,
    specialty: doctor.specialty,
    yearsOfExperience: doctor.yearsOfExperience,
    focus: doctor.focus,
    gender: doctor.gender,
    rating: doctor.rating,
    reviewsCount: doctor.reviewsCount
});

module.exports =  doctorDto ;