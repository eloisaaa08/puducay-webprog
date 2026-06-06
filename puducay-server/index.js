require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

module.exports = app;