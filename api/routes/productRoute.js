const express = require('express');
const {searchProduct, postProduct, getProduct, deleteProduct, updateProduct, getByBrandProduct, getProductById, getByCategoryProduct, getNewProduct, filterProducts } = require('../controllers/productController');

const router = express.Router()

router.post("/filter",filterProducts)
router.get("/search", searchProduct)
router.get("/", getProduct)
router.get("/newProduct", getNewProduct)

router.get("/:id", getByBrandProduct)
router.get("/category/:id", getByCategoryProduct)

router.get("/productDetail/:id", getProductById)


router.post("/", postProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)




module.exports = router