require('dotenv').config({path: '../.env'}); // Sử dụng biến môi trường
const express = require('express');
const port = process.env.PORT;
const app = express();
const authRoutes = require('./Routes/api/userRoutes');
const adminRoutes=require('./Routes/api/adminUserRoutes');
const userWeb = require('./Routes/web/userWebRoute');
const configViewEngie=require('./config/viewEngie');
configViewEngie(app);
app.use(express.urlencoded({ extended: true }));
app.use('/',userWeb);
//Dùng cho API
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api',adminRoutes);

// Khởi động máy chủ và lắng nghe cổng được chỉ định
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
