const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        unique:true,
        required:true
    },
    createdAt:{
      type: Date,
      default:Date.now,  
      expires: 86400
    }
})

const blacklistTokenModel = mongoose.model('blacklistToken',blacklistTokenSchema);

module.exports = blacklistTokenModel;