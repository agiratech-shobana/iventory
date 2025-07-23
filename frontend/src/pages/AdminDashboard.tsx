


// // export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import RegisterUserForm from "../components/RegisterUserForm";
// import "../App.css";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     productsAwaitingApproval: 0,
//     todaysAddedProducts: 0,
//     lowStockProducts: 0,
//     highStockProducts: 0,
//     totalQuantityInStock: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/products/dashboard-stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error("Error fetching dashboard stats:", err);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <Layout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Admin Dashboard</h2>
//         <div className="dashboard-cards">
//           <div className="dashboard-card">Total Products: <span>{stats.totalProducts}</span></div>
//           <div className="dashboard-card">Awaiting Approval: <span>{stats.productsAwaitingApproval}</span></div>
//           <div className="dashboard-card">Today’s Added Products: <span>{stats.todaysAddedProducts}</span></div>
//           <div className="dashboard-card">Low Stock Products (≤3): <span>{stats.lowStockProducts}</span></div>
//           <div className="dashboard-card">High Stock Products (&gt;50): <span>{stats.highStockProducts}</span></div>
//           <div className="dashboard-card">Total Quantity in Stock: <span>{stats.totalQuantityInStock}</span></div>
//         </div>
//         <div className="dashboard-form-section">
//           <h3>Register User</h3>
//           <RegisterUserForm />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import RegisterUserForm from "../components/RegisterUserForm";
import { getDashboardStatsAPI } from "../api/productsApi";
import "../App.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    productsAwaitingApproval: 0,
    todaysAddedProducts: 0,
    lowStockProducts: 0,
    highStockProducts: 0,
    totalQuantityInStock: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStatsAPI();
        setStats(result);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">Total Products: <span>{stats.totalProducts}</span></div>
          <div className="dashboard-card">Awaiting Approval: <span>{stats.productsAwaitingApproval}</span></div>
          <div className="dashboard-card">Today’s Added Products: <span>{stats.todaysAddedProducts}</span></div>
          <div className="dashboard-card">Low Stock Products (≤3): <span>{stats.lowStockProducts}</span></div>
          <div className="dashboard-card">High Stock Products (&gt;50): <span>{stats.highStockProducts}</span></div>
          <div className="dashboard-card">Total Quantity in Stock: <span>{stats.totalQuantityInStock}</span></div>
        </div>
        <div className="dashboard-form-section">
          <h3>Register User</h3>
          <RegisterUserForm />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
