const connection= require('../../config/mysql.js');
class Product {
    constructor(id, title, price, discount, thumbnail, description, created_at, updated_at, deleted, category_id) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.thumbnail = thumbnail;
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
    
}

module.exports = Product;