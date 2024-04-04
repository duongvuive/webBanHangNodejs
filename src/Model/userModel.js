const connection = require('../config/mysql');
const bcrypt = require('bcrypt');
class User {
    constructor(userData) {
        this.id = userData.id;
        this.fullname = userData.fullname;
        this.email = userData.email;
        this.phone_number = userData.phone_number;
        this.address = userData.address;
        this.password = userData.password;
        this.created_at = userData.created_at;
        this.updated_at = userData.updated_at;
        this.deleted = userData.deleted;
        this.role_id = userData.role_id;
    }
    // Phương thức để lấy tất cả các user từ cơ sở dữ liệu
    static async getAllUsers() {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM user');
            return rows;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách user:', error);
            throw error;
        }
    }

    // Phương thức để tạo mới user trong cơ sở dữ liệu
    static async createUser(userData) {
        try {
            const { fullname, email, phone_number, address, password, role_id } = userData;
            const [result] = await connection.promise().query('INSERT INTO user (fullname, email, phone_number, address, password, role_id) VALUES (?, ?, ?, ?, ?, ?)', [fullname, email, phone_number, address, password, role_id]);
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi tạo user:', error);
            throw error;
        }
    }
    static async registerUser(email,password) {
        try {
            const role_id = 2; // Giả sử 2 là ID của role cho khách hàng
            const [result] = await connection.promise().query('INSERT INTO user (email, password, role_id) VALUES (?, ?, ?)', [email, password, role_id]); // Chỉ chèn email, password và role_id vào cơ sở dữ liệu
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi đăng ký user:', error);
            throw error;
        }
    }
    

    // Phương thức để xóa user từ cơ sở dữ liệu
    static async deleteUser(userId) {
        try {
            const [result] = await connection.promise().query('DELETE FROM user WHERE id = ?', [userId]);
            return result.affectedRows;
        } catch (error) {
            console.error('Lỗi khi xóa user:', error);
            throw error;
        }
    }

    // Phương thức để reset mật khẩu của user trong cơ sở dữ liệu
    static async resetPassword(id, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const [result] = await connection.promise().query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, id]);
            return result.affectedRows;
        } catch (error) {
            console.error('Lỗi khi reset mật khẩu:', error);
            throw error;
        }
    }
    static async specifiedUser(email,password){
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
            return rows.length >0 ? rows[0]:null;
        } catch (error) {
            throw error;
        }
    }
    static async existingEmail(email) {
        try {
            const [result] = await connection.promise().query('SELECT COUNT(*) as count FROM user WHERE email = ?', [email]);
            return result[0].count > 0; // Trả về true nếu email tồn tại, ngược lại trả về false
        } catch (error) {
            throw error;
        }
    }
    static async getUserByEmail(email) {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM user WHERE email = ?', [email]);
            return rows.length > 0 ? rows[0] : null; // Trả về dòng dữ liệu đầu tiên nếu tồn tại email, ngược lại trả về null
        } catch (error) {
            throw error;
        }
    }
    // static async getUserByID(id) {
    //     try {
    //         const [rows] = await connection.promise().query('SELECT * FROM user WHERE id = ?', [id]);
    //         return rows.length > 0 ? rows[0] : null; // Trả về dòng dữ liệu đầu tiên nếu tồn tại email, ngược lại trả về null
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
}

module.exports = User;