const express = require('express');
const { getComment ,postComment, deleteComment, updateComment, getCommentByProduct } = require('../controllers/commentController');

const router = express.Router()

router.get("/", getComment)
router.get("/getCommentByProduct/:id", getCommentByProduct)
router.post("/", postComment)
router.delete("/:id", deleteComment)
router.put("/:id", updateComment)




module.exports = router