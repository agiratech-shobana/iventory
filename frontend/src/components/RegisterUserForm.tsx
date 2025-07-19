// import { useState } from "react";
// import axios from "../api/axios";

// const RegisterUserForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       // ✅ Add role directly in request payload
//       const res = await axios.post("/register", {
//         ...formData,
//         role: "user", // 👈 hardcoded here
//       });

//       setSuccess("User registered successfully!");
//       setFormData({ username: "", password: "" });
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed.");
//     }
//   };

//   return (
//     <div style={{ padding: "1rem", maxWidth: "400px" }}>
//       <h3>Register New User</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <button type="submit">Register</button>
//         {success && <p style={{ color: "green" }}>{success}</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default RegisterUserForm;
import { useState } from "react";
import axios from "../api/axios";

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // Clear field error
  };

  // ✅ Validate form before submit
  const validate = () => {
    let valid = true;
    const errors = { username: "", password: "" };

    if (formData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
      valid = false;
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!validate()) return;

    try {
      const res = await axios.post("/register", {
        ...formData,
        role: "user", // Hardcoded as user
      });

      setSuccess("User registered successfully!");
      setFormData({ username: "", password: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px" }}>
      <h3>Register New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {formErrors.username && <p style={{ color: "red" }}>{formErrors.username}</p>}
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
        <br />

        <button type="submit">Register</button>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterUserForm;
