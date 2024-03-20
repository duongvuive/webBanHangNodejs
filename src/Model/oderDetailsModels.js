const connection = require('../../config/mysql.js');
class OrderDetail {
    constructor(id, price, num, total_money, orders_id, product_id) {
        this.id = id;
        this.price = price;
        this.num = num;
        this.total_money = total_money;
        this.orders_id = orders_id;
        this.product_id = product_id;
    }


    // Các phương thức khác tại đây nếu cần
}

module.exports = OrderDetail;