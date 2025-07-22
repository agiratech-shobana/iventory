const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products")
app.use(cors());              // Allow frontend to connect
app.use(express.json());      // Parse incoming JSON requests

app.use("/api", authRoutes);  // Mount routes at /api
app.use('/api/products',() => {console.log("ssssss");
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
 