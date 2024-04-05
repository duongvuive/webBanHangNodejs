const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorizeUser = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Token không tồn tại' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token đã hết hạn' });
                }
                return res.status(403).json({ error: 'Token không hợp lệ' });
            }

            if (roles && !roles.includes(decoded.role)) {
                return res.status(403).json({ error: 'Không có quyền truy cập' });
            }

            req.user = decoded;
            next();
        });
    };
};

module.exports = authorizeUser;
