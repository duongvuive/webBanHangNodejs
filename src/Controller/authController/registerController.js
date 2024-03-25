const User = require('../../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('email :',email);
        const emailExists = await User.existingEmail(email);
        if (emailExists) {
            return res.status(400).json({ error: 'Email đã tồn tại' });
        } else {
            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Đăng ký người dùng với mật khẩu đã mã hóa
            const user = await User.registerUser(email, hashedPassword);

            // Kiểm tra loại yêu cầu của client
            if (req.accepts('html')) {
                // Nếu client yêu cầu HTML, chuyển hướng đến trang đăng nhập
                res.redirect('/login'); // Thay '/login' bằng đường dẫn đến trang đăng nhập thực tế
            } else {
                // Nếu client yêu cầu JSON, trả về JSON
                res.status(201).json({ message: 'Đăng ký thành công'});
            }
        }

    } catch (error) {
        console.error('Lỗi khi đăng ký người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

module.exports = register;
