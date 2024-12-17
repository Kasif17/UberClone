const express = require('express');
const validatRequest = require('../middlewares/validation')
const {userRegister} = require('../controllers/user.controller')
const router = express.Router();


router.post('/register',validatRequest, userRegister)



module.exports = router;