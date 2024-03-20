require('dotenv').config({path: '../.env'}); // Sử dụng biến môi trường
const express = require('express');
const port = process.env.PORT;
const app = express();
// Khởi động máy chủ và lắng nghe cổng được chỉ định
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
