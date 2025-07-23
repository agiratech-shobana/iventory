const express = require("express");
const router = express.Router();

const {getDashboardStats} = require("../Controllers/reportController");

router.get('/dashboard-stats', getDashboardStats);
 
module.exports=router;