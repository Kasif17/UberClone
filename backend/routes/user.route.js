const express = require('express');
const validatRequest = require('../middlewares/validation')
const {userRegister, userLogin} = require('../controllers/user.controller')
const router = express.Router();


router.post('/register',validatRequest, userRegister)

router.post('/login',userLogin);

module.exports = router;