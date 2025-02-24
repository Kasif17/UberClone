const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captian.model')

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const blacklistToken = await blacklistTokenModel.findOne({'token' : token});

        if(blacklistToken){
         return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWTToken);

        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ msg: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token expired" });
        }

        console.error("Authentication Error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const authCaptain = async (req, res, next) => {
    
        // Extract token from cookies or authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }
        console.log(blacklistTokenModel)
        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token : token });
        if (isBlacklisted) {
            return res.status(401).json({ msg: "Unauthorized: Token is blacklisted" });
        }

       try {
         // Verify the token
         const decoded = jwt.verify(token, process.env.JWTToken);

         // Find the user
         const captain = await captainModel.findById(decoded._id);
         if (!captain) {
             return res.status(404).json({ msg: "Captain not found" });
         }
 
         // Attach user to the request object
         req.captain = captain;
         next();
       } catch (error) {
           console.log(error)
           res.status(400).json({massage:"unauthorize"})
       }
    
};
module.exports = {
    authUser,
    authCaptain
};
