
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store"; // or wherever your store is configured
import { logout } from "../store/authSlice"; // ✅ your actual path
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Import your CSS file for styling
import { FaTachometerAlt, FaPlus, FaClipboardCheck, FaChartBar, FaBoxOpen, FaBars, FaSignOutAlt } from "react-icons/fa";

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
    <aside className="sidebar" style={{ width: "200px", backgroundColor: "grey", padding: "1rem", height: "100vh" }}>
      <h3 className="heading">Inventory</h3>
      <ul className="menu-list"     style={{ listStyle: "none", paddingLeft: 0 }}>
        <li className="menu-item"><Link className="menu-link" to={dashboardPath}>Dashboard</Link></li>
        <li className="menu-item"><Link className="menu-link"  to="/products">Add Product</Link></li>
        <li className="menu-item"><Link  className="menu-link" to="/approval">Approval Queue</Link></li>
        {role === "admin" &&(
       <li className="menu-item">
        <Link  className="menu-link"    to="/admin/reports">Reports</Link></li>

        )}

        {/* <li><Link to="/my-products"> My Products</Link></li> */}
        {role === "user" && (
  <li  className="menu-item">
    <Link   className="menu-link"to="/my-products">My Products</Link>
  </li>
)}

        <li className="menu-item">
          <button className="menu-link"
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
    </aside>
  );
};

export default Sidebar;
