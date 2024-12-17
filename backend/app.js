const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const express = require('express');
const dbConnection = require('./db/db.connection');
const userRoutes = require('./routes/user.route')
const app = express();

dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoutes)

app.use('/',(req,res)=>{
    res.send('Hello from server');
})



module.exports = app;