const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Create a new order
const createOrder = async (req, res, resSend = false) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.id; // Extracted from token

        const product = await Product.findByPk(productId);
        if (!product) {
            const message = "Product not found";
            if (!resSend) return res.status(404).json({ success: false, message });
            throw new Error(message);
        }

        const totalAmount = product.price * quantity;

        const order = await Order.create({ userId, productId, quantity, totalAmount });

        if (!resSend) {
            return res.status(201).json({ success: true, message: "Order placed successfully", order });
        }
        return order;
    } catch (error) {
        console.error(error);
        if (!resSend) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
        throw error;
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: [User, Product] });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, { include: [User, Product] });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update order status
const updateOrderStatus = async (req, res, resSend = false) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            const message = "Order not found";
            if (!resSend) return res.status(404).json({ success: false, message });
            throw new Error(message);
        }

        order.status = status;
        await order.save();

        if (!resSend) {
            return res.status(200).json({ success: true, message: "Order status updated", order });
        }
        return order;
    } catch (error) {
        console.error(error);
        if (!resSend) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
        throw error;
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        await order.destroy();
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder };
