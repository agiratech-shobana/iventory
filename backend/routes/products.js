
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // mysql connection

// POST /api/products
router.post("/addProduct", (req, res) => {
  const {
    name, brand, quantity, price, description,
    category, image, status, addedBy
  } = req.body;

  const sql = `
    INSERT INTO products
    (name, brand, quantity, price, description, category, image, status, added_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, brand, quantity, price, description, category, image, status, addedBy],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});

module.exports = router;
