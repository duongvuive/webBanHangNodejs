// productRoutes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../../Controller/authController/productController');

// Định nghĩa các route cho sản phẩm
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/createproduct', ProductController.createProduct);
router.post('/edit/:id', ProductController.updateProduct);
router.post('/products/delete/:id', ProductController.deleteProduct);

module.exports = router;

