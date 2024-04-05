const { request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = (req, res,next) => {
    const tokenFromCookie = req.cookies.jwt;
    const tokenFromHeader = req.headers.authorization;
    console.log('token from header: ', tokenFromHeader);
    if (!tokenFromCookie || !tokenFromHeader) {
        return res.status(401).json({ error: 'Token không tồn tại' });
    }

    // Lấy phần token từ tiêu đề "Authorization" (Bearer token)
    const token = tokenFromHeader.split(' ')[1];

    try {
        // Xác thực token từ cookie
        const decodedCookieToken = jwt.verify(tokenFromCookie, process.env.ACCESS_TOKEN_SERCRET);
        // Xác thực token từ tiêu đề "Authorization"
        const decodedHeaderToken = jwt.verify(token, process.env.ACCESS_TOKEN_SERCRET);

        // So sánh token từ cookie và token từ tiêu đề "Authorization"
        if (decodedCookieToken.userId !== decodedHeaderToken.userId) {
            return res.status(401).json({ error: 'Token không hợp lệ' });
        }

        req.user = decodedHeaderToken; // Lưu thông tin người dùng vào request

        next(); // Cho phép tiếp tục thực hiện các chức năng khác
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token đã hết hạn' });
        } else {
            return res.status(401).json({ error: 'Token không hợp lệ' });
        }
    }
}

module.exports = authenticateToken;
