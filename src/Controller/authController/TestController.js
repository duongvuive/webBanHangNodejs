const connection = require('../../config/mysql.js');
const express = require('express');
const router = express.Router();

connection.query('SELECT * FROM role', function(err, results, fields) {
    if (err) {
        console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
        return;
    }
    // In kết quả truy vấn ra terminal
    console.log('Kết quả truy vấn:', results);
});

module.exports = router;
