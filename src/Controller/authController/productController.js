// productController.js
const Product = require('../../Model/productModel');
const Category = require('../../Model/categoryModel');
class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await Product.getAllProducts();
            const categoryNames = {};
            
            for (const product of products) {
                const categoryName = await Category.findNameCategory(product.category_id);
                categoryNames[product.category_id] = categoryName;
            }   
            res.render('products.ejs', { products: products , categoryNames: categoryNames});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.getProductById(productId);
            if (!product) {
                res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.json(product);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createProduct(req, res) {
        try {
            const { title, price, discount, description, category_id } = req.body;
            const productId = await Product.createProduct({ title, price, discount, description, category_id });
    
            // Kiểm tra nếu yêu cầu là JSON
            if (req.headers['content-type'] === 'application/json') {
                res.status(201).json({ id: productId, message: 'Sản phẩm đã được tạo' });
            } else { // Nếu không phải là JSON, thực hiện redirect
                res.redirect('/products');
            }
        } catch (error) {
            console.error('Lỗi khi tạo sản phẩm:', error);
            res.status(500).json({ error: error.message });
        }
    }
    

    static async updateProduct(req, res) {
        try {
            const {id} = req.params;
            const { title, price, discount, description, category_id } = req.body;
            const affectedRows = await Product.updateProduct(id, { title, price, discount, description, category_id });
            if (affectedRows === 0) {
                res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.redirect('/products');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const affectedRows = await Product.deleteProduct(productId);
            if (affectedRows === 0) {
                res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.redirect('/products');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;
