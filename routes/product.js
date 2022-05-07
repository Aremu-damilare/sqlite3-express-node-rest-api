const { getProducts, getProduct, createProduct, updateProduct } = require('../controllers/productController')

var router = require('express').Router();


router.route('/')
.post(function (req, res){
    createProduct(req, res)
});

router.route('/:id/user')
.get(function (req, res){
    getProduct(req, res)
});

router.route('/:id/update')
.patch(function (req, res){
    updateProduct(req, res)
});

router.route('/all')
.get(function (req, res){
    getProducts(req, res)
});



module.exports = router;