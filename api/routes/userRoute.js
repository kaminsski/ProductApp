const express = require('express');
const { getUser, getUsers, register, login, updateUser } = require('../controllers/userController');

const router = express.Router()

router.get("/", getUsers)
router.get("/user/:id", getUser)
router.post("/register", register)
router.post("/login", login)
router.put("/:id", updateUser)





module.exports = router