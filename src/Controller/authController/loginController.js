const User = require('../../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Email không tồn tại' });
        }
        // Kiểm tra mật khẩu đã nhập
        if (!password) {
            return res.status(400).json({ error: 'Vui lòng nhập mật khẩu' });
        }
        // Kiểm tra mật khẩu đã nhập với mật khẩu đã được mã hóa
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        // Tạo JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_SERCRET, { expiresIn: process.env.ExpiresIn });
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.ExpiresIn });
        if (req.accepts('html')) {
            // Nếu là yêu cầu HTML, thực hiện redirect
            res.redirect('/home');}
        else{
            res.status(200).json({ message: 'Đăng nhập thành công', token: token });
        }
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

module.exports = login;
