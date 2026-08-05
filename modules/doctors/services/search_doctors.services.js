const searchDoctors = (doctors, search) => {
  if (!search) return doctors;

  const keyword = search.toLowerCase().trim();

  return doctors.filter((doctor) => {
    if (!doctor.userId) return false;

    return (
      doctor.userId.name.toLowerCase().includes(keyword) ||
      doctor.specialty.toLowerCase().includes(keyword) ||
      doctor.focus.toLowerCase().includes(keyword)
    );
  });
};

module.exports = searchDoctors;