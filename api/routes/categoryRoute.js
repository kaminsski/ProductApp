const express = require('express');
const upload = require('../config/multerConfig'); // Multer konfigürasyon dosyasını import edin


const { getCategory, postCategory, deleteCategory, updateCategory, getCategoryById } = require('../controllers/categoryController');



const router = express.Router()

router.get("/:id", getCategoryById)
router.get("/", getCategory)
router.post("/",upload.single("image"), postCategory)
router.delete("/:id", deleteCategory)
router.put("/:id",upload.single("image"), updateCategory)




module.exports = router