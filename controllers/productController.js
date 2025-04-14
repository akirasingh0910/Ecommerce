const Product = require("../models/productModel");

// ✅ Create a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const product = await Product.create({ name, price, category, stock });

        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Update product by ID
const updateProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.update({ name, price, category, stock });

        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.destroy();

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// 🔹 Export all functions
module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
