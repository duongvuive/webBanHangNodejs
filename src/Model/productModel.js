// productModel.js
const connection= require('../config/mysql');
class Product {
    constructor(id, title, price, discount, description, created_at, updated_at, deleted, category_id) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted = deleted;
        this.category_id = category_id;
    }

    static async getAllProducts() {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM product');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getProductById(productId) {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM product WHERE id = ?', [productId]);
            return rows[0];
        } catch (error) {
            console.error('Lỗi khi tạo user:', error);
            throw error;
        }
    }

    static async createProduct(productData) {
        try {
            const { title, price, discount, description, category_id } = productData;
            const values = [title, price, discount, description, category_id];
            const [result] = await connection.promise().query('INSERT INTO product (title, price, discount, description, category_id) VALUES (?, ?, ?, ?, ?)', values);
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi tạo product:', error);
            throw error;
        }
    }
    

    static async updateProduct(productId, productData) {
        try {
            const { title, price, discount, description, category_id } = productData;
            const sql = `UPDATE product SET title = ?, price = ?,  discount = ?, description = ?, category_id = ? WHERE id = ?`;
            const [result] = await connection.promise().query(sql, [title, price, discount, description, category_id, productId]);
            return result.affectedRows;
        } catch (error) {
            console.error('Lỗi khi chỉnh sửa người dùng:', error);
            throw error;
        }
    }

    static async deleteProduct(productId) {
        try {
            const [result] = await connection.promise().query('DELETE FROM product WHERE id = ?', [productId]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = Product;