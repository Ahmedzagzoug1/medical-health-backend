const app=require('express');

const {verifyToken}=require('../../../shared/middleware/verify_token');
const allow_roles=require('../../../shared/middleware/allow_roles');
const UserRole=require('../../../shared/utils/user_role');
const {createDoctorValidation,updateProfileValidation,workingHoursValidation,
    availableSlotsValidation,
    updateWorkingHoursValidation
}=require('../validator/doctor.validator');
const router=app.Router();
const{getAllDoctors,updateProfile,createDoctor,getDoctorProfile,setWorkingHours,
    getWorkingHours, modifyWorkingHours, deleteWorkingHours, getDoctorById, getAvailableSlots}=require('../controllers/doctors.controller');

router.get('/',getAllDoctors);
router.post('/',verifyToken,allow_roles(UserRole.ADMIN),createDoctorValidation,createDoctor);

router.patch('/profile',updateProfileValidation,verifyToken,allow_roles(UserRole.DOCTOR),updateProfile);
router.get('/profile/:id',getDoctorProfile);
router.put('/working-hours',verifyToken,allow_roles(UserRole.DOCTOR),workingHoursValidation,setWorkingHours);
router.get('/working-hours/:id',getWorkingHours);
router.patch('/working-hours/:id',verifyToken,allow_roles(UserRole.DOCTOR),updateWorkingHoursValidation,modifyWorkingHours);
router.delete('/working-hours/:id',verifyToken,allow_roles(UserRole.DOCTOR),deleteWorkingHours);
router.get(
  "/:doctorId/available-slots",
  availableSlotsValidation,
  getAvailableSlots
);
router.get('/:id',getDoctorById);
module.exports=router;

