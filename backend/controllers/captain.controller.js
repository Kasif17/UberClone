const captainModel = require('../models/captian.model');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model')
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
   const errors = validationResult(req);
   if(!errors.isEmpty){
    return res.status(400).json({errors:errors.array()})
   }

   const {email, password} = req.body;

   const captain = await captainModel.findOne({email}).select('+password');

   if(!captain){
    return res.status(400).json({massage:"invalid email or password"})
   }

   const isMatch = await captain.comparePassword(password);

   if(!isMatch){
    return res.status(400).json({massage:"invalid email or password"})
   }

   const token = captain.generateAutoToken();
   res.cookie('token',token);

   return res.status(200).json({token, captain})
}

const captainProfile = async(req,res,next)=>{
    res.status(200).json(req.captain)
}


const captainLogout = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
   await blacklistTokenModel.create({token})

    res.clearCookie('token');
    
    res.status(201).json({msg:"User Logout Successfully "})
}


module.exports = {
    captainRegister,
    captainLogin,
    captainProfile,
    captainLogout
}