const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

const PORT = process.env.PORT || 5000;

// Import routers
const authRouter = require("./controllers/auth");
const usersRouter = require("./controllers/users");
const activitiesRouter = require("./controllers/activities"); // بدل entries

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/activities", activitiesRouter);

// Test route
app.get("/", (req, res) => {
  res.send("TimeBank API running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
