const express = require('express');
const { getColor, postColor } = require('../controllers/colorController');

const router = express.Router()

router.get("/", getColor)
router.post("/", postColor)





module.exports = router