const express = require('express');
const { getFavByUser, postFav, deleteFav, updateFav, getFavUser } = require('../controllers/favController');

const router = express.Router()

router.get("/:id", getFavByUser)
router.get("/userFav/:id", getFavUser)

router.post("/:id", postFav)
router.delete("/:id", deleteFav)
router.put("/:id", updateFav)




module.exports = router