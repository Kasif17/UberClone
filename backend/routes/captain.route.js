const express = require('express');
const { body } = require('express-validator');

const captainValidation = require('../middlewares/capatin.validation');
const {captainRegister,captainLogin, captainProfile, captainLogout} = require('../controllers/captain.controller');

const { authCaptain } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register',captainValidation, captainRegister)

 router.post('/login',[ body('email')
             .notEmpty().withMessage('Email must not be empty')
             .isEmail().withMessage('Email must be a valid email address'),
         body('password')
             .notEmpty().withMessage('Password must not be empty')
             .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            ]
            ,captainLogin);

 router.get('/profile',authCaptain,captainProfile);

 router.get('/logout',authCaptain,captainLogout)

module.exports = router;