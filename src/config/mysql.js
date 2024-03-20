
const mysql = require('mysql2');
require('dotenv').config({path: '../../.env'}); // Sử dụng biến môi trường

const connection = mysql.createConnection({
    host: process.env.host ,
    user:  process.env.user ,
    password:  process.env.password ,
    database:  process.env.database 
});

connection.connect(function(err) {
    if (err) {
        console.error('Không kết nối được Database:', err);
        return;
    }
    console.log('Kết nối thành công đến MySQL server');
});

module.exports = connection;
