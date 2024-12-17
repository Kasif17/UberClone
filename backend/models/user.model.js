
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
            minLength: [3, 'First Name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            minLength: [3, 'Last Name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        minLength: [6, 'Email must be at least 6 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false, 
        minLength: [6, 'Password must be at least 6 characters long']
    },
    socketId: {
        type: String
    }
}, { timestamps: true }); 

// Generate JWT Token
userSchema.methods.generateAutoToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWTToken,
        { expiresIn: '1d' }
    );
    return token;
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash Password (static method)
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
