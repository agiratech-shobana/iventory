// controllers/productController.js
const db=require("../config/db")

 // MySQL connection

exports.addProduct = (req, res) => {
  const {
    name, brand, stock, price, description,
    category, image, status = 'pending', addedBy
  } = req.body;

  const sql = `
    INSERT INTO products
    (name, brand, stock, price, description, category, image, status, addedBy)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, brand, stock, price, description, category, image, status, addedBy],
    (err, result) => {
      if (err) {
        console.log("error adding product:", err)
        
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
  console.log("Incoming Product Data:", {
  name, brand, stock, price, description, category, image, status, addedBy
});

};

exports.getAllProducts = (req, res) => {
  const sql = `SELECT * FROM products ORDER BY createdAt DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    name, brand, stock, price, description,
    category, image, status
  } = req.body;

  const sql = `
    UPDATE products
    SET name = ?, brand = ?, stock = ?, price = ?, description = ?,
        category = ?, image = ?, status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, brand, stock, price, description, category, image, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Product not found" });

      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};


// controllers/productController.js
exports.approveProduct = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE products SET status = 'approved' WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    // send back updated product object
    db.query("SELECT * FROM products WHERE id = ?", [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows[0]);
    });
  });
};

exports.rejectProduct = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE products SET status = 'rejected' WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    db.query("SELECT * FROM products WHERE id = ?", [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows[0]);
    });
  });
};






// ✅ Get Dashboard Stats
// export const getAdminDashboardStats = async (req, res) => {
//   try {
//     const [approved] = await db.query("SELECT COUNT(*) as count FROM products WHERE status = 'approved'");
//     const [total] = await db.query("SELECT COUNT(*) as count FROM products");
//     const [pending] = await db.query("SELECT COUNT(*) as count FROM products WHERE status = 'pending'");
//     const [today] = await db.query("SELECT COUNT(*) as count FROM products WHERE DATE(createdAt) = CURDATE() AND status = 'approved'");
//     const [lowStock] = await db.query("SELECT COUNT(*) as count FROM products WHERE stock <= 3 AND status = 'approved'");
//     const [highStock] = await db.query("SELECT COUNT(*) as count FROM products WHERE stock > 50 AND status = 'approved'");
//     const [totalStock] = await db.query("SELECT SUM(stock) as sum FROM products WHERE status = 'approved'");

//     res.status(200).json({
//       totalProducts: total[0].count,
//       productsAwaitingApproval: pending[0].count,
//       todaysAddedProducts: today[0].count,
//       lowStockProducts: lowStock[0].count,
//       highStockProducts: highStock[0].count,
//       totalQuantityInStock: totalStock[0].sum || 0,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching dashboard stats" });
//   }
// };
exports.getAdminDashboardStats = (req, res) => {
  const stats = {
    totalProducts: 0,
    productsAwaitingApproval: 0,
    todaysAddedProducts: 0,
    lowStockProducts: 0,
    highStockProducts: 0,
    totalQuantityInStock: 0,
  };

  db.query("SELECT COUNT(*) as count FROM products", (err, total) => {
    if (err) return res.status(500).json({ message: "Error getting total", error: err });

    stats.totalProducts = total[0].count;

    db.query("SELECT COUNT(*) as count FROM products WHERE status = 'pending'", (err, pending) => {
      if (err) return res.status(500).json({ message: "Error getting pending", error: err });

      stats.productsAwaitingApproval = pending[0].count;

      db.query(
        "SELECT COUNT(*) as count FROM products WHERE DATE(createdAt) = CURDATE() AND status = 'approved'",
        (err, today) => {
          if (err) return res.status(500).json({ message: "Error getting today", error: err });

          stats.todaysAddedProducts = today[0].count;

          db.query(
            "SELECT COUNT(*) as count FROM products WHERE stock <= 3 AND status = 'approved'",
            (err, lowStock) => {
              if (err) return res.status(500).json({ message: "Error getting lowStock", error: err });

              stats.lowStockProducts = lowStock[0].count;

              db.query(
                "SELECT COUNT(*) as count FROM products WHERE stock > 50 AND status = 'approved'",
                (err, highStock) => {
                  if (err) return res.status(500).json({ message: "Error getting highStock", error: err });

                  stats.highStockProducts = highStock[0].count;

                  db.query(
                    "SELECT SUM(stock) as sum FROM products WHERE status = 'approved'",
                    (err, totalStock) => {
                      if (err) return res.status(500).json({ message: "Error getting total stock", error: err });

                      stats.totalQuantityInStock = totalStock[0].sum || 0;

                      return res.status(200).json(stats);
                    }
                  );
                }
              );
            }
          );
        }
      );
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

// exports.getMyProducts = (req, res) => {
//   const userEmail = req.user?.email;

//   if (!userEmail) {
//     return res.status(401).json({ message: "Unauthorized access" });
//   }

//   const sql = "SELECT * FROM products WHERE addedBy = ?";
//   db.query(sql, [userEmail], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result);
//   });
// };