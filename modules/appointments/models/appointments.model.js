const mongoose =require('mongoose');
const AppointmentStatus = require('../../../shared/utils/appointment_status');
const cancelReason = require('../../../shared/utils/cancel_reason');
const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: AppointmentStatus,
      default: "pending",
    },

    problem: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    cancelReason: {
    type: String,
    enum: [
      cancelReason.RESCHEDULE,cancelReason.WEATHER,cancelReason.WORK,cancelReason.OTHER
    ]
},
cancelReasonNote: String
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;