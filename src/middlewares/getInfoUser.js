const jwt = require('jsonwebtoken');

const extractTokenFromCookie = (req, res, next) => {
    // Kiểm tra xem cookie có tồn tại không
    if (req.cookies && req.cookies.jwt) {
        try {
            const token = req.cookies.jwt;
            // Giải mã token để lấy thông tin người dùng
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // Lưu thông tin người dùng vào request để sử dụng sau này
            req.userId = decoded.userId; // Lấy userId từ decoded
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
        }
    }
    next();
};

module.exports = extractTokenFromCookie;
