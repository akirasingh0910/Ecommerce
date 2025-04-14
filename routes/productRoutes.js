const express = require("express");
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const isauthenticated = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.route("/addproduct").post(isauthenticated, addProduct);
router.route("/getproducts").get(getProducts);
router.route("/getproduct/:id").get(getProductById);
router.route("/updateproduct/:id").put(isauthenticated, updateProduct);
router.route("/deleteproduct/:id").delete(isauthenticated, deleteProduct);


module.exports = router;
