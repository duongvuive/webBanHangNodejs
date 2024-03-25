const express = require('express');
const router = express.Router();
const userLogin= require('../../Controller/authController/loginController');
const userRegister=require('../../Controller/authController/registerController');
const authenticateToken = require('../../middlewares/authenticateToken');
router.post('/login',userLogin);
router.post('/register',userRegister);
module.exports = router;
