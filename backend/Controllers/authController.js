
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log("📥 Login request received:", username);

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length === 0) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];
    console.log("🔐 Stored hash:", user.password);
    console.log("🔑 Entered password:", password);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log("❌ Bcrypt error:", err);
        return res.status(500).json({ message: "Password check failed" });
      }

      if (!isMatch) {
        console.log("❌ Passwords do not match!");
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        "jwt_secret",
        { expiresIn: "1h" }
      );

      res.json({
        token,
        username: user.username,
        role: user.role,
      });
    });
  });
};


// Register Controller
exports.register = (req, res) => {
  const { username, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Hashing failed" });

    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hash, role],
      (err, result) => {
        if (err) {
          console.error("MySQL Insert Error:", err); // See actual error in terminal
          return res.status(500).json({ message: "User creation failed" });
        }

        res.json({ message: "User created successfully" });
      }
    );
  });
};
