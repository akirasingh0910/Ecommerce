const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./userModel");
const Product = require("./productModel");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: DataTypes.ENUM("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
    defaultValue: "Pending",
  },
}, { timestamps: true });

// Define associations
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.hasMany(Order, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Product, { foreignKey: "productId" });

module.exports = Order;
