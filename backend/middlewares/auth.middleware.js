const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const blacklistToken = await userModel.findOne({'token' : token});

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

module.exports = {
    authUser
};
