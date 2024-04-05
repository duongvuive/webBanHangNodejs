require('dotenv').config(); // Sử dụng biến môi trường từ tệp .env

const express = require('express');
const app = express();
const port = process.env.PORT ; // Sử dụng mặc định là 3000 nếu PORT không được định nghĩa trong .env
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/api/userRoutes');
const adminRoutes = require('./Routes/api/adminUserRoutes');
const userWeb = require('./Routes/web/WebRoute');
const configViewEngine = require('./config/viewEngie');
//cấu hình cookie
app.use(cookieParser());
//cấu hình view engie
configViewEngine(app);

app.use(express.urlencoded({ extended: true }));
app.use('/', userWeb);

// Sử dụng JSON middleware cho API
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);

// Khởi động máy chủ và lắng nghe cổng được chỉ định
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
