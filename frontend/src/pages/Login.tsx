
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import "../styles/Loginstyle.css";

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

      console.log("reeeeee",res);
      
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

    <section className="loginpage" >
      <div className="login-box">
        <div className="login-header">
            <header>Login</header>
        </div>
        <form onSubmit={handleLogin}>
        <div className="input-box">
             <input
         type="text"
         className="input-field"
           placeholder="Username"
           value={username}
          onChange={(e) => setUsername(e.target.value)}
           required
         />
        </div>
        <div className="input-box">
          <input
           type="password"
           className="input-field"

           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
         />
        </div>
        
        <div className="input-submit">
             <button className="submit-btn"  id="submit" type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        </div>
        </form>
        
    </div>
    </section>

  );
};

export default Login;
