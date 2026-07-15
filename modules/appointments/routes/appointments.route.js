const app=require('express');
const {verifyToken}=require('../../../shared/middleware/verify_token');
const allow_roles=require('../../../shared/middleware/allow_roles');
const UserRole=require('../../../shared/utils/user_role');
const {getMyAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    getDoctorAppointments,confirmAppointment,completeAppointment,rejectAppointment,noShowAppointment
}=require('../controllers/appointments.controller');
const {createAppointmentValidation,updateAppointmentValidation}=require('../validator/appointments.validator');
const router=app.Router();
router.post('/',verifyToken,allow_roles(UserRole.PATIENT),createAppointment);
router.get('/me',verifyToken,allow_roles(UserRole.PATIENT),getMyAppointments);
router.get('/:appointmentId',verifyToken,allow_roles(UserRole.PATIENT),getAppointmentById);
router.patch('/:appointmentId',verifyToken,allow_roles(UserRole.PATIENT),      updateAppointment);
router.patch('/:appointmentId/cancel',verifyToken,allow_roles(UserRole.PATIENT),cancelAppointment);
router.patch('/:appointmentId/confirm',verifyToken,allow_roles(UserRole.DOCTOR),confirmAppointment);
router.patch('/:appointmentId/complete',verifyToken,allow_roles(UserRole.DOCTOR),completeAppointment);
router.patch('/:appointmentId/reject',verifyToken,allow_roles(UserRole.DOCTOR),rejectAppointment);
router.patch('/:appointmentId/no-show',verifyToken,allow_roles(UserRole.DOCTOR),noShowAppointment);
router.get('/doctor/my-appointments',verifyToken,allow_roles(UserRole.DOCTOR),getDoctorAppointments);
module.exports=router;