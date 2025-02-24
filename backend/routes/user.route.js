const express = require('express');
const validatRequest = require('../middlewares/validation');
const { authUser } = require('../middlewares/auth.middleware');
const {userRegister, userLogin, userProfile, userLogout} = require('../controllers/user.controller')
const router = express.Router();


router.post('/register',validatRequest, userRegister)

router.post('/login',userLogin);

router.get('/profile',authUser,userProfile);

router.get('/logout',authUser,userLogout)

module.exports = router;