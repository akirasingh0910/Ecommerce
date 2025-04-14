const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const isAuthenticated = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new order and send confirmation email
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const order = await createOrder(req, res, true); // Use the refactored controller
    await sendOrderConfirmationEmail(order); // Email logic
    res.status(201).json({ success: true, message: "Order placed & email sent", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
});

// Update order status and send status update email
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const order = await updateOrderStatus(req, res, true); // Use the refactored controller
    await sendOrderStatusUpdateEmail(order); // Email logic
    res.status(200).json({ success: true, message: "Order status updated & email sent", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
});

// Get all orders
router.get("/", isAuthenticated, getAllOrders);

// Get a single order by ID
router.get("/:id", isAuthenticated, getOrderById);

// Delete an order
router.delete("/:id", isAuthenticated, deleteOrder);

module.exports = router;
