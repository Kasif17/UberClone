const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser')
const dbConnection = require('./db/db.connection');
const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.route')
const app = express();

dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

// app.use('/',(req,res)=>{
//     res.send('Hello from server');
// })



module.exports = app;