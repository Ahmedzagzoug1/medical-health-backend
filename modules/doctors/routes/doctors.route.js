const app=require('express');

const {verifyToken}=require('../../../shared/middleware/verify_token');
const allow_roles=require('../../../shared/middleware/allow_roles');
const UserRole=require('../../../shared/utils/user_role');
const {createDoctorValidation,updateProfileValidation}=require('../validator/doctor.validator');
const router=app.Router();
const{getAllDoctors,updateProfile,createDoctor,getDoctorProfile,setAvailability,
    getAvailability,getDoctorById}=require('../controllers/doctors.controller');

router.get('/',getAllDoctors);
router.post('/',verifyToken,allow_roles(UserRole.ADMIN),createDoctorValidation,createDoctor);

router.patch('/profile',updateProfileValidation,verifyToken,allow_roles(UserRole.DOCTOR),updateProfile);
router.get('/profile/:id',getDoctorProfile);
router.put('/availability',verifyToken,allow_roles(UserRole.DOCTOR),setAvailability);
router.get('/availability/:id',getAvailability);
router.get('/:id',getDoctorById);
module.exports=router;

