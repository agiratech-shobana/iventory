const db = require('../config/db');

exports.getAdminStats = (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const sql = `
    SELECT
      COUNT(*) AS totalProducts,
      SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approvedProducts,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS productsAwaitingApproval,
      SUM(CASE WHEN status = 'approved' AND DATE(createdAt) = ? THEN 1 ELSE 0 END) AS todaysAddedProducts,
      SUM(CASE WHEN status = 'approved' AND stock <= 3 THEN 1 ELSE 0 END) AS lowStockProducts,
      SUM(CASE WHEN status = 'approved' AND stock >= 50 THEN 1 ELSE 0 END) AS highStockProducts,
      SUM(CASE WHEN status = 'approved' THEN stock ELSE 0 END) AS totalQuantityInStock
    FROM products
  `;

  db.query(sql, [today], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]); // Return as single object
  });
};
