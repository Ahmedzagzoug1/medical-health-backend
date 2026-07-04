const async_wrapper=require('../../../shared/middleware/async_wrapper');
const Doctor=require('../../doctors/models/doctor.model');
const HttpstatusText=require('../../../shared/utils/http_status_text');
const AppError=require('../../../shared/utils/app_error'); 

const getFavoriteDoctors=async_wrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpstatusText.Success,'message':'data get successfully',
'data':{}
    });
});

const addFavoriteDoctors=async_wrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpstatusText.Success,'message':'data get successfully',
'data':{}
    });
});

const getCompletedDoctors=async_wrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpstatusText.Success,'message':'data get successfully',
'data':{}
    });
});

const getWaitingAppointments=async_wrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpstatusText.Success,'message':'data get successfully',
'data':{}
    });
});

const getCancledAppointments=async_wrapper(async(req,res,next)=>{

    res.status(200).json({'status':HttpstatusText.Success,'message':'data get successfully',
'data':{}
    });
});






module.exports={getFavoriteDoctors,addFavoriteDoctors,
    getWaitingAppointments,getCompletedAppointments,
    getCancledAppointments}