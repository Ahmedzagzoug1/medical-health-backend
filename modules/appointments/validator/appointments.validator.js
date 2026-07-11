const { handleValidation}=require('../../../shared/middleware/handle_validation');
const {body,param}=require('express-validator');
const AppointmentStatus=require('../../../shared/utils/appointment_status');
const createAppointmentValidation=[
    body('doctorId').notEmpty().withMessage('doctorId is required'),
    body('appointmentDate').notEmpty().withMessage('appointmentDate is required').isISO8601().toDate().withMessage('appointmentDate must be a valid date'),
    body('startTime').notEmpty().withMessage('startTime is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('startTime must be in HH:mm format'),
    body('endTime').notEmpty().withMessage('endTime is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('endTime must be in HH:mm format'),
    body('problem').optional().isString().withMessage('problem must be a string'),
    handleValidation
];
const updateAppointmentValidation=[
    param('id').notEmpty().withMessage('Appointment ID is required').isMongoId().withMessage('Invalid Appointment ID'),
    body('status').optional().isIn(Object.values(AppointmentStatus)).withMessage(`Status must be one of: ${Object.values(AppointmentStatus).join(', ')}`),
    handleValidation
];
module.exports={
    createAppointmentValidation,
    updateAppointmentValidation
};
