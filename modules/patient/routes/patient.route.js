
const express = require('express');
const {verifyToken}=require('../../../shared/middleware/verify_token');
const userRole=require('../../../shared/utils/user_role');

const allow_roles=require('../../../shared/middleware/allow_roles');
const {getFavoriteDoctors,addFavoriteDoctors,
    getWaitingAppointments,getCompletedAppointments,
    getCancledAppointments}=require('../controllers/patient.controller');

const router=express.Router();
router.get('/favouriteDoctors',verifyToken,getFavoriteDoctors);
router.post('/favouriteDoctor',verifyToken,addFavoriteDoctors);
router.get('/waitingAppointments',verifyToken,getWaitingAppointments);
router.get('/completedAppointments',verifyToken,getCompletedAppointments);
router.get('/cancledAppointments',verifyToken,getCancledAppointments);

module.exports=router;