const app=require('express');
const {verifyToken}=require('../../../shared/middleware/verify_token');
const allow_roles=require('../../../shared/middleware/allow_roles');
const UserRole=require('../../../shared/utils/user_role');
const {getMyAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    getDoctorAppointments
}=require('../controllers/appointments.controller');
const {createAppointmentValidation,updateAppointmentValidation}=require('../validator/appointments.validator');
const router=app.Router();
router.post('/',verifyToken,allow_roles(UserRole.PATIENT),createAppointment);
router.get('/me',verifyToken,allow_roles(UserRole.PATIENT),getMyAppointments);
router.get('/:id',verifyToken,allow_roles(UserRole.PATIENT),getAppointmentById);
router.patch('/:id',verifyToken,allow_roles(UserRole.PATIENT),      updateAppointment);
router.delete('/:id',verifyToken,allow_roles(UserRole.PATIENT),cancelAppointment);
router.get('/doctor',verifyToken,allow_roles(UserRole.DOCTOR),getDoctorAppointments);
module.exports=router;