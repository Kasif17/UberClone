const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authUser = async(req,res,next)=>{
   const token = req.cookies.token || req.headers.authorization.split(' ')[1];

   if(!token){
    res.status(401).json({msg:"Unautorize"})
   }
   try {
      const decode = jwt.verify(token,process.env.JWTToken);
      const user = await userModel.findById(decode._id,decode.email);
      req.user = user;
      return next();
   } catch (error) {
     console.log(error);
     
   }
}

module.exports = {
    authUser
}