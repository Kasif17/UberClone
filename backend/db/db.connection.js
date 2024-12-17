const mongoose = require('mongoose');

function dbConnection(){
    mongoose.connect(process.env.MONGOURL)
    .then(()=>{console.log('Connected sucessfully',{
    })
})
    .catch(err=>{
        console.log(err);
        
    })
}


module.exports = dbConnection;