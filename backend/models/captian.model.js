const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
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
    },
    statuc:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehical:{
        color:{
            type:String,
            required:true,
            minLength:[3,'at least 3 character must']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'plate must be at least 3 latter']
        },
        capacity :{
            type:Number,
            required:true,
            minLength:[1,'capacity must be at least 1']
        },
        vehicalType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        }

    },
    location:{
        lat:{
          type:Number
        },
        lng:{
            type:Number
        }
    }
})
//Token
captainSchema.methods.generateAutoToken = function(){
     const token = jwt.sign({
        _id:this._id
     },
     process.env.JWTToken,{expiresIn:'1d'}
    )
    return token;
}
//compare Password 
captainSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

//hashed Password
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password ,10)
}

const captainModel = mongoose.model('Captian',captainSchema);

module.exports = captainModel;