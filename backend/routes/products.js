
const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  approveProduct,
  rejectProduct,
  getAdminDashboardStats,
  getMyProducts
} = require("../Controllers/productController");
// const { verifyToken } = require('../middleware/auth');

router.get("/getdashboardData", getAdminDashboardStats)
router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);
router.delete("/deleteProduct/:id", deleteProduct);
router.patch("/updateProduct/:id", updateProduct);
router.patch("/approve/:id",approveProduct);
router.patch("/reject/:id",rejectProduct);

// router.get("/myproducts", verifyToken, getMyProducts);




module.exports = router;


