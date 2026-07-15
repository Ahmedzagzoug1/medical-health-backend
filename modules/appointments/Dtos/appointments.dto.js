class AppointmentDto  {
  constructor(appointment){
this.id=appointment.id;
this.doctorId=appointment.doctorId;
this.patientId=appointment.patientId;
this.appointmentDate=appointment.appointmentDate;
this.startTime=appointment.startTime;
this.endTime=appointment.endTime;
this.problem=appointment.problem;
this.status=appointment.status;

  }
}
  
module.exports = AppointmentDto;