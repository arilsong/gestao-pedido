const express = require("express");
const { createUser, login, getUser, updateUser } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/register',createUser)
router.post('/login', login)
router.get('/get',isAuthenticated, getUser)
router.put('/update',isAuthenticated, updateUser)

module.exports = router