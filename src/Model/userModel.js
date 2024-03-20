const connection = require('../../config/mysql.js');
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
    static async registerUser(userData) {
        try {
            const { fullname, email, phone_number, address, password } = userData;
            const role_id = 2; // Giả sử 2 là ID của role cho khách hàng
            const [result] = await connection.promise().query('INSERT INTO user (fullname, email, phone_number, address, password, role_id) VALUES (?, ?, ?, ?, ?, ?)', [fullname, email, phone_number, address, password, role_id]);
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
    static async resetPassword(email, newPassword) {
        try {
            const [result] = await connection.promise().query('UPDATE user SET password = ? WHERE email = ?', [newPassword, email]);
            return result.affectedRows;
        } catch (error) {
            console.error('Lỗi khi reset mật khẩu:', error);
            throw error;
        }
    }
}

module.exports = User;