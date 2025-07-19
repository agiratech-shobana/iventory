
//src/pages/AdminDashboard.tsx
import Layout from "../components/Layout";
import RegisterUserForm from "../components/RegisterUserForm";

const AdminDashboard = () => {
  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin! You can approve items, manage inventory, and view reports.</p>
      <RegisterUserForm />
      {/* Add more admin functionalities here */}
    </Layout>
  );
};

export default AdminDashboard;

// src/pages/AdminDashboard.tsx

// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import { Pie } from "react-chartjs-2";
// import Layout from "../components/Layout";
// import "chart.js/auto";

// const AdminDashboard = () => {
//   const products = useSelector((state: RootState) => state.products.products);

//   const totalProducts = products.length;
//   const approved = products.filter((p) => p.status === "approved").length;
//   const rejected = products.filter((p) => p.status === "rejected").length;
//   const pending = products.filter((p) => p.status === "pending").length;

//   const pieData = {
//     labels: ["Approved", "Rejected", "Pending"],
//     datasets: [
//       {
//         data: [approved, rejected, pending],
//         backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
//       },
//     ],
//   };

//   return (
//     <Layout>
//     <div style={{ padding: "2rem" }}>
//       <h1>Admin Dashboard</h1>

//       <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
//         <div style={{ flex: 1, background: "#f4f4f4", padding: "1rem" }}>
//           <h3>Total Products</h3>
//           <p>{totalProducts}</p>
//         </div>
//         <div style={{ flex: 1, background: "#d0ffd0", padding: "1rem" }}>
//           <h3>Approved</h3>
//           <p>{approved}</p>
//         </div>
//         <div style={{ flex: 1, background: "#ffd0d0", padding: "1rem" }}>
//           <h3>Rejected</h3>
//           <p>{rejected}</p>
//         </div>
//         <div style={{ flex: 1, background: "#fff3cd", padding: "1rem" }}>
//           <h3>Pending</h3>
//           <p>{pending}</p>
//         </div>
//       </div>

//       <div style={{ maxWidth: "400px", marginTop: "2rem" }}>
//         <Pie data={pieData} />
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;
