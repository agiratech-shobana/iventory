
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
    <div className="register-container"  style={{
        padding: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}>
      {/* <h3 className="form-title">Register New User</h3> */}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
           style={{
            padding: "0.5rem",
            width: "100%",
            marginBottom: "0.25rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            
          }}
        />
        {formErrors.username && <p style={{ color: "red",marginTop:0 }}>{formErrors.username}</p>}
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          style={{
            padding: "0.5rem",
            width: "100%",
            marginTop: "0.5rem",
            marginBottom: "0.25rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        {formErrors.password && <p style={{ color: "red",marginTop:0 }}>{formErrors.password}</p>}
        <br />

        <button type="submit" className="form-button"  style={{
            marginTop: "0.5rem",
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>Register</button>

        {success && <p style={{ color: "green",marginTop:"0.5rem" }}>{success}</p>}
        {error && <p style={{ color: "red" ,marginTop:"0.5rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterUserForm;
