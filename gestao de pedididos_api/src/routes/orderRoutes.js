const express = require("express");
const { createOrder, updateOrder, getOrderUser, getAllOrder } = require("../controllers/orderController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/', isAuthenticated, createOrder)
router.put('/:id', updateOrder)
router.get('/order-company', isAuthenticated, getOrderUser)
router.get('/orders', isAuthenticated, isAdmin, getAllOrder)

module.exports = router