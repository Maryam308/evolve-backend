// server.js
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const authRoutes = require("./controllers/auth");
const usersRoutes = require("./controllers/users");
const activitiesRoutes = require("./controllers/entries");
const goalsRoutes = require("./controllers/goals");
const challengesRoutes = require("./controllers/challenges");
const { verifyToken } = require("./middleware/auth");

const app = express();

// Port
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/auth", authRoutes); // login, signup
app.use("/users", verifyToken, usersRoutes); // protected
app.use("/activities", verifyToken, activitiesRoutes); // protected CRUD
app.use("/goals", verifyToken, goalsRoutes); // protected CRUD
app.use("/challenges", verifyToken, challengesRoutes); // protected CRUD

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to TimeBank+ API!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
