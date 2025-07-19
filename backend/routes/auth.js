const express = require("express");
const router = express.Router();
const { login, register } = require("../Controllers/authController");

// POST /api/login → login user
router.post("/login", login);

// POST /api/register → admin creates a new user
router.post("/register", register);

module.exports = router;
