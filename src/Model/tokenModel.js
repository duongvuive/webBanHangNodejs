const connection = require('../config/mysql');

class Token {
    constructor(token, created_at, user_id) {
        this.token = token;
        this.created_at = created_at;
        this.user_id = user_id;
    }

    static async createToken(token, user_id,created_at) {
        try {
            const sql = 'INSERT INTO tokens (token, user_id, created_at) VALUES (?, ?, ?)';
            const [result] = await connection.promise().query(sql, [token, user_id, created_at]);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async findUser(user_id) {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM tokens WHERE user_id = ?', [user_id]);
            return rows.length > 0 ? rows[0] : null; // Trả về dòng dữ liệu đầu tiên nếu tồn tại user id, ngược lại trả về null
        } catch (error) {
            throw error;
        }
    }
    static async findToken(token) {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM tokens WHERE token = ?', [token]);
            return rows.length > 0 ? rows[0] : null; 
        } catch (error) {
            throw error;
        }
    }
    static async updateUserPasswordToken(user_id, token, created_at) {
        try {
            await  connection.promise().query('UPDATE tokens SET token = ?, created_at = ? WHERE user_id = ?', [token, created_at, user_id]);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // Các phương thức khác tại đây nếu cần
}

module.exports = Token;
