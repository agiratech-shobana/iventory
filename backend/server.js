

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/reports");


app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
 app.use("/api", authRoutes);              // For login/signup

app.use("/api/products", productRoutes);
app.use("/api/reports", reportRoutes);


app.listen(3003, () => {
  console.log("Server running on port 3003");
});
