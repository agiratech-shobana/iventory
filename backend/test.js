// const bcrypt = require("bcryptjs");

// const plain = "admin456";
// const hash = "$2a$10$1eDpQeDsLviPHiBFxY1Lpef.DsJxxqq8DQhtipDASi7JdzKybYAHK";

// bcrypt.compare(plain, hash, (err, result) => {
//   if (err) {
//     console.error("❌ Error comparing:", err);
//     return;
//   }
//   console.log("✅ Do they match?", result); // Should log: true
// });
const bcrypt = require("bcryptjs");

const password = "admin456";

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("❌ Hashing error:", err);
    return;
  }

  console.log("✅ Hashed password:", hash);
});
