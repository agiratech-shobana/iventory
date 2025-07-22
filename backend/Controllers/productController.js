// backend/controllers/productController.js
const db = require('../config/db'); // Adjust path if needed

exports.addProduct = (req, res) => {
  const { name, category, brand, price, stock, description, addedBy } = req.body;

  const sql = `
    INSERT INTO products (name, category, brand, price, stock, description, addedBy)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, category, brand, price, stock, description, addedBy], (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Product added successfully' });
  });
};



