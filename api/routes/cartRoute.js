const express = require('express');
const { getCartByUser, postCart, deleteCart, updateCart } = require('../controllers/cartController');

const router = express.Router()

router.get("/:id", getCartByUser)
router.post("/", postCart)
router.delete("/:id", deleteCart)
router.put("/:id", updateCart)




module.exports = router