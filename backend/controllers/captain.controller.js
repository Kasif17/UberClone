const captainModel = require('../models/captian.model');
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')

const captainRegister = async(req,res,next)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()})
   }

   const{fullName,email,password, vehical} = req.body;

   const isCaptainAlreadyExits = await captainModel.findOne({email});
   
   if(isCaptainAlreadyExits){
      return res.status(400).json({massege:'Captain Already Exits'})
   }

   const hashedPassword = await captainModel.hashPassword(password);

   const captain = await captainService.createCaptain({
    firstName:fullName.firstName,
    lastName:fullName.lastName,
    email,
    password:hashedPassword,
    color:vehical.color,
    plate:vehical.plate,
    capacity:vehical.capacity,
    vehicalType:vehical.vehicalType
   })

   const token = captain.generateAutoToken();

   res.status(201).json({token , captain})

}

const captainLogin = async(req,res,next)=>{

}

const captainProfile = async(req,res,next)=>{

}


const captainLogout = async(req,res,next)=>{

}


module.exports = {
    captainRegister,
    captainLogin,
    captainProfile,
    captainLogout
}