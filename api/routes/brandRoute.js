const express = require('express');
const { getBrand, postBrand, deleteBrand, updateBrand, getBrandById } = require("../controllers/brandController");
const upload = require('../config/multerConfig'); // Multer konfigürasyon dosyasını import edin

const router = express.Router()

router.get("/:id", getBrandById)
router.get("/", getBrand)
router.post("/",upload.single("image"), postBrand)
router.delete("/:id", deleteBrand)
router.put("/:id",upload.single("image"),  updateBrand)




module.exports = router