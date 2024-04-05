const express = require('express');
const router = express.Router();
const authorizeUser = require('../../middlewares/authorizeToken');
const AdminUserController=require('../../Controller/authController/adminUserController');
router.get('/admin/account',AdminUserController.getAllUsers);
router.post('/admin/account/create',AdminUserController.createUser);
router.post('/admin/account/delete/:userId',authorizeUser(['Admin']),AdminUserController.deleteUser);
router.post('/admin/account/edit/:userId',AdminUserController.editUser);
module.exports=router;