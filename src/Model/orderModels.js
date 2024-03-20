const connection = require('../../config/mysql.js');
class Order {
    constructor(id, fullname, email, phone_number, address, note, order_date, status, total_money, user_id) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone_number = phone_number;
        this.address = address;
        this.note = note;
        this.order_date = order_date;
        this.status = status;
        this.total_money = total_money;
        this.user_id = user_id;
    }

    static async getAllOrders() {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM orders');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Các phương thức khác tại đây nếu cần
}

module.exports = Order;