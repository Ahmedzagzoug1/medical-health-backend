
const express = require('express');
const {verifyToken}=require('../../../shared/middleware/verify_token');
const userRole=require('../../../shared/utils/user_role');

const allow_roles=require('../../../shared/middleware/allow_roles');
const {getFavoriteDoctors,addFavoriteDoctor,removeFavoriteDoctor,
   getPatientAppointments}=require('../controllers/patient.controller');

const router=express.Router();
router.get('/favouriteDoctors',verifyToken,allow_roles(userRole.PATIENT),getFavoriteDoctors);
router.post('/favouriteDoctor',verifyToken,allow_roles(userRole.PATIENT),addFavoriteDoctor);
router.delete('/favouriteDoctor',verifyToken,allow_roles(userRole.PATIENT), removeFavoriteDoctor);
router.get('/appointments',verifyToken,getPatientAppointments);

module.exports=router;