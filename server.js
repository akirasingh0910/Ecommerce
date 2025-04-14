require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { sequelize, connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql");

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Crafted Wonders🚀");
});

// RESTful API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Start Apollo Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  // Sync Sequelize Models
  sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ Database synchronized."))
    .catch((err) => console.error("❌ Error synchronizing database:", err));

  // Start Express Server
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🚀 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
      });
      console.log("✅ Database is connected successfully.");
    })
    .catch((err) => {
      console.error("❌ Database connection error:", err);
    });
}

startApolloServer();
