const express = require('express');
const captainValidation = require('../middlewares/capatin.validation');
const {captainRegister,captainLogin, captainProfile, captainLogout} = require('../controllers/captain.controller');
//const {authUser} = require('../middlewares/auth.middleware ')
const router = express.Router();

router.post('/register',captainValidation, captainRegister)

// router.post('/login',captainLogin);

// router.get('/profile',authUser,captainProfile);

// router.get('/logout',authUser,captainLogout)

module.exports = router;