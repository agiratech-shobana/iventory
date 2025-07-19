
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); //to send the reduc action

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/login", { username, password });
      const { token, role } = res.data;

      //  Save user to Redux + localStorage via reducer
      dispatch(setUser({ token, role, username }));
      localStorage.setItem("currentUser", username); // ✅ Add this line


      //  Navigate by role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
