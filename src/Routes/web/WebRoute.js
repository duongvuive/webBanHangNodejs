const express = require('express');
const router = express.Router();
const adminController= require('../../Controller/authController/adminUserController');
const Role =require('../../Model/roleModel');
const User=require('../../Model/userModel');
const authorizeUser = require('../../middlewares/authorizeToken');
router.get('/login',(req, res) => {
    res.render('loginView.ejs');
});
router.get('/register',(req,res)=>{
        res.render('registerView.ejs');
    } );
router.get('/home',(req, res) => {
        res.render('home.ejs');
});
router.get('/forgotPassword',(req, res) => {
    res.render('forgotPassword.ejs');
});
router.get('/ResetPassword/:token', (req, res) => {
    // Lấy giá trị của token từ req.params
    const token = req.params.token;
    // Truyền giá trị của token vào view resetPassword.ejs
    res.render('resetPassword.ejs', { token: token });
});
//Admin:
router.get('/admin', authorizeUser(['Admin']),adminController.getAllUsers);
router.get('/admin/create',authorizeUser(['Admin']), async (req, res) => {
    try {
        const roleName = await Role.getAllRoles(); // Chờ cho đến khi Promise hoàn thành
        // Truyền giá trị của token vào view resetPassword.ejs
        res.render('createUser.ejs', { roleName: roleName }); // Truyền dữ liệu vào view
    } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách vai trò' });
    }
});
router.get('/admin/edit/:userId',authorizeUser(['Admin']), async (req, res) => {
    try {
        const { userId } = req.params;
        const roleName = await Role.getAllRoles(); // Chờ cho đến khi Promise hoàn thành
        const user = await User.getUserByID(userId); // Lấy thông tin người dùng theo userId
        // Truyền giá trị của roleName và thông tin người dùng vào view editUser.ejs
        res.render('editUser.ejs', { roleName: roleName, user: user });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò hoặc thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu' });
    }
});

    module.exports = router;