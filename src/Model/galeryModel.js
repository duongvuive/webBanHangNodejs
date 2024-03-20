const connection = require('../../config/mysql.js');
class Galery{
    constructor(galeryData) {
        this.id = galeryData.id;
        this.thumbnail = galeryData.thumbnail;
        this.product_id = galeryData.product_id;
    }
    static async getAllGalery(){
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM galery');
            return rows;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách galery:', error);
            throw error;
        }
    }
    static async createGalery(galeryName) {
        try {
            const [result] = await connection.promise().query('INSERT INTO galery (name) VALUES (?)', [galeryName]);
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi tạo galery:', error);
            throw error;
        }
    }
}
module.exports = Galery;