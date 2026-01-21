const express = require("express");
const http = require("http"); // 👈 NEW: Import native HTTP module
const { Server } = require("socket.io"); // 👈 NEW: Import Socket.io
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// 1. Import Routes
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// 2. NEW: Wrap Express app in HTTP Server
const server = http.createServer(app);

// 3. NEW: Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your Vite frontend
    methods: ["GET", "POST"]
  }
});

// 4. NEW: Make 'io' accessible to your route files
app.set("io", io);

// 5. NEW: Handle Socket Connections (for debugging)
io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);
  socket.on("disconnect", () => console.log("❌ User disconnected"));
});

// Connect Database
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/notifications", notificationRoutes);

// Health Check
const PORT = process.env.PORT || 5050;
app.get("/health", (req, res) => res.json({ 
  status: "Server is UP", 
  port: PORT,
  time: new Date().toISOString() 
}));

// Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Backend Error:", err.stack);
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ message: "AI Engine is offline." });
  }
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// 6. NEW: Change app.listen to server.listen
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 AI Engine expected at http://127.0.0.1:5001`);
  console.log(`📡 WebSockets enabled on port ${PORT}`);
});