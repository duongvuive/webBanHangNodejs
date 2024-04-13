const User = require('../../Model/userModel');
const Role =require("../../Model/roleModel");
var ResHelper = require('../../helper/ResponseHelper');
var sendmail = require('../../helper/sendMail');
const jwt = require('jsonwebtoken');
const Token= require('../../Model/tokenModel');
const bcrypt = require('bcrypt');
var crypto = require('crypto');
require('dotenv').config();
const loginController={
     login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Kiểm tra xem người dùng có tồn tại không
            const user = await User.getUserByEmail(email);
            const role = await Role.findNameRole(user.role_id);
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
            const token = jwt.sign({ userId: user.id, role: role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ExpiresIn });
            console.log('json web token:', token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.ExpiresIn });
            if(req.headers['content-type'] === 'application/json'){
                res.status(200).json({ message: 'Đăng nhập thành công'});
            }
            else{
              res.redirect('/products');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        }
    },
    forgetPassword: async (req, res, next) => {
      var user = await User.getUserByEmail(req.body.email);
      if (user) {
          var checkToken = await Token.findUser(user.id);
          var resetPasswordToken;
          var token;
          resetPasswordToken = crypto.randomBytes(30).toString('hex');
          const resetPasswordExp = new Date(Date.now() + 10 * 60 * 1000);
          if (!checkToken) {
              token = await Token.createToken(resetPasswordToken, user.id, resetPasswordExp);
          } else {
              token = await Token.updateUserPasswordToken(user.id, resetPasswordToken, resetPasswordExp);
          }
          try {
              let url = `http://${process.env.hostName}/ResetPassword/${resetPasswordToken}`;
              let message = `click zo url de reset passs: ${url}`;
              sendmail(message, user.email);
              // Kiểm tra nếu request là từ Postman
              if (req.headers['content-type'] === 'application/json') {
                  ResHelper.RenderRes(res, true, "Thành Công");
              } else {
                  // Nếu không phải từ Postman, hiển thị view và thông báo alert
                  return res.render('successAlert.ejs', { message: 'Email đã được gửi thành công.' });
              }
          } catch (error) {
              ResHelper.RenderRes(res, false, error);
          }
      } else {
          ResHelper.RenderRes(res, false, "email không tồn tại");
      }
  }
  ,
      resetPassword: async (req, res, next) => {
        try {
            var findToken = await Token.findToken(req.params.token);
    
            if (findToken) {
                if (findToken.created_at > Date.now()) {
                    var user = await User.resetPassword(findToken.user_id, req.body.password);
                    
                    // Kiểm tra nếu request chứa header 'content-type' là 'application/json'
                    if (req.headers['content-type'] === 'application/json') {
                        // Nếu là JSON request, trả về thông báo JSON cho Postman
                        return res.json({ success: true, message: 'Reset thành công' });
                    } else {
                        // Nếu không phải JSON request, chuyển hướng sang trang đăng nhập
                        // và hiển thị alert thông báo đổi mật khẩu thành công
                        res.redirect('/login?password_reset_success=true');
                    }
                } else {
                    ResHelper.RenderRes(res, false, "URL hết hạn");
                }
            } else {
                ResHelper.RenderRes(res, false, "URL không hợp lệ");
            }
        } catch (error) {
            console.error('Lỗi:', error);
            ResHelper.RenderRes(res, false, error.message);
        }
    }
};


module.exports = loginController;
