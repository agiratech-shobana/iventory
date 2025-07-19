const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");

app.use(cors());              // Allow frontend to connect
app.use(express.json());      // Parse incoming JSON requests

app.use("/api", authRoutes);  // Mount routes at /api

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
