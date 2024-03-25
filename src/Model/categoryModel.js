const connection = require('../config/mysql');

class Category {
    constructor(categoryData) {
        this.id = categoryData.id;
        this.name = categoryData.name;
    }
    // Phương thức để lấy tất cả các category từ cơ sở dữ liệu
    static async getAllCategories() {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM category');
            return rows;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách category:', error);
            throw error;
        }
    }

    // Phương thức để tạo mới category trong cơ sở dữ liệu
    static async createCategory(categoryName) {
        try {
            const [result] = await connection.promise().query('INSERT INTO category (name) VALUES (?)', [categoryName]);
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi tạo category:', error);
            throw error;
        }
    }
}

module.exports = Category;
