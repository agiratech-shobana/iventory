const db=require("../config/db");


// exports.getDashboardStats = (req, res) => {
//   const sql = `
//     SELECT
//       COUNT(*) AS totalProducts,
//       SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved,
//       SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
//       SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
//       SUM(CASE WHEN autoApprove = 1 THEN 1 ELSE 0 END) AS autoApproved
//     FROM products;
//   `;

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result[0]); // return stats as single object
//   });
// };


exports.getDashboardStats = (req, res) => {
  const statsSql = `
    SELECT
      COUNT(*) AS totalProducts,
      SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
      SUM(CASE WHEN autoApprove = 1 THEN 1 ELSE 0 END) AS autoApproved
    FROM products;
  `;

  const recentSql = `
    SELECT * FROM products ORDER BY createdAt DESC LIMIT 5;
  `;

  // Step 1: Get stats
  db.query(statsSql, (err, statsResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const stats = statsResult[0]; // single row with count data

    // Step 2: Get recent products
    db.query(recentSql, (err2, recentResult) => {
      if (err2) return res.status(500).json({ error: err2.message });

      // Step 3: Send both in one response
      res.json({
        ...stats,
        recent: recentResult,
      });
    });
  });
};


// exports.getMyProducts = (req, res) => {
//   const userEmail = req.user?.email; // Available from token after middleware

//   if (!userEmail) {
//     return res.status(401).json({ message: "Unauthorized access" });
//   }

//   const sql = "SELECT * FROM products WHERE addedBy = ?";
//   db.query(sql, [userEmail], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result);
//   });
// };
