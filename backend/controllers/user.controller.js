const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model')

const userRegister = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        const isUserAlreadyExits = await userModel.findOne({email});
   
        if(isUserAlreadyExits){
           return res.status(400).json({massege:'User Already Exits'})
        }
         console.log(req.body);
         
        // Hash the password
        const hashPassword = await userModel.hashPassword(password);

        // Create user
        const user = await userService.createUser({
            firstName: fullName.firstName, 
            lastName: fullName.lastName,
            email,
            password: hashPassword
        });

        // Generate JWT Token
        const token = user.generateAutoToken();

        res.status(201).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Login 

const userLogin = async (req,res,next)=>{
     try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            res.status(402).json({msg:"Invalid Credentials"})
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            res.status(402).json({msg:"Invalid Credentials"})
        }

        const token = await user.generateAutoToken();
        res.cookie('token',token);
        res.status(200).json({user,token})
     } catch (error) {
        
     }
}

//profile 

const userProfile = async (req,res)=>{
     res.status(200).json(req.user)
}

//logout 

const userLogout = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
   await blacklistTokenModel.create({token})
    res.status(201).json({msg:"User Logout Successfully "})
}
module.exports = {
    userRegister,
    userLogin,
    userProfile,
    userLogout
};
