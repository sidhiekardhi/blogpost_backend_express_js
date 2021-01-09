const express= require('express');
const ProductController = require('../controllers/Products');
const router = express.Router();

//CREATE => POST
router.post('/products', ProductController.createProduct)

//READ => GET
router.get('/product', ProductController.getAllProduct)

module.exports= router;