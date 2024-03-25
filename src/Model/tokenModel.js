const connection = require('../../config/mysql');

class Token {
    constructor(token, created_at, user_id) {
        this.token = token;
        this.created_at = created_at;
        this.user_id = user_id;
    }

    static async createToken(token, user_id) {
        try {
            const sql = 'INSERT INTO tokens (token, user_id, created_at) VALUES (?, ?, NOW())';
            const [result] = await db.promise().execute(sql, [token, user_id]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Các phương thức khác tại đây nếu cần
}

module.exports = Token;
