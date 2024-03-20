const connection = require('../../config/mysql.js');
class Role {
    constructor(roleData) {
        this.id = roleData.id;
        this.name = roleData.name;
    }
    // Phương thức để lấy tất cả các role từ cơ sở dữ liệu
    static async getAllRoles() {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM role');
            return rows;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách role:', error);
            throw error;
        }
    }

    // Phương thức để tạo mới role trong cơ sở dữ liệu
    static async createRole(roleName) {
        try {
            const [result] = await connection.promise().query('INSERT INTO role (name) VALUES (?)', [roleName]);
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi tạo role:', error);
            throw error;
        }
    }
    static async deleteRole(roleId){
        try{
            const [result]= await connection.promise().query('DELETE FROM role WHERE id = ?', [roleId]);
            return result.affectedRows;
        }catch(err){
            console.error('Lỗi khi xóa role:', error);
            throw error;
        }
    }
}

module.exports = Role;