
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store"; // or wherever your store is configured
import { logout } from "../store/authSlice"; // ✅ your actual path
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const dashboardPath = role === "admin" ? "/admin" : "/user";

  return (
    <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "1rem", height: "100vh" }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li><Link to={dashboardPath}>Dashboard</Link></li>
        <li><Link to="/products">Add Product</Link></li>
        <li><Link to="/approval">Approval Queue</Link></li>
       <li><Link to="/report">Reports</Link></li>
       <Link to="/admin/reports">Reports</Link>

        <Link to="/my-products">📦 My Products</Link>
        <li>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "crimson",
              marginTop: "1rem",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
