const app=require('express');

const {verifyToken}=require('../../../shared/middleware/verify_token');
const allow_roles=require('../../../shared/middleware/allow_roles');
const UserRole=require('../../../shared/utils/user_role');
const router=app.Router();
const{getAllDoctors,updateProfile,addDoctor,getProfile,setAvailability,
    getAvailability,getDoctorById}=require('../controllers/doctors.controller');

router.get('/',getAllDoctors);
router.post('/profile',verifyToken,allow_roles(UserRole.DOCTOR),addDoctor);

router.put('/profile',verifyToken,allow_roles(UserRole.DOCTOR),updateProfile);
router.get('/profile/:id',getProfile);
router.put('/availability',verifyToken,allow_roles(UserRole.DOCTOR),setAvailability);
router.get('/availability',getAvailability);
router.get('/:id',getDoctorById);
module.exports=router;