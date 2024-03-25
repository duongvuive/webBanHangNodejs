const express = require('express');
const router = express.Router();
const AdminUserController=require('../../Controller/authController/adminUserController');
router.get('/admin/account',AdminUserController.getAllUsers);
router.post('/admin/account/create',AdminUserController.createUser);
router.delete('/admin/account/delete',AdminUserController.deleteUser);
module.exports=router;