// // src/pages/ReportsPage.tsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import Layout from "../components/Layout";  
// import { Product } from "../store/productSlice";
// import { format } from "date-fns"; // for date formatting
// const ReportsPage: React.FC = () => {
//   const products = useSelector((state: RootState) => state.products.products);
//   const username = useSelector((state: RootState) => state.auth.username);

//   // 🗓️ Today’s date string
//   const today = new Date().toISOString().split("T")[0];

//   // 📊 Filtered stats
//   const total = products.length;
//   const approved = products.filter(p => p.status === "approved").length;
//   const rejected = products.filter(p => p.status === "rejected").length;
//   const pending = products.filter(p => p.status === "pending").length;
//   const autoApproved = products.filter(p => p.autoApprove).length;
//   const addedToday = products.filter(product => product.createdAt && product.createdAt.startsWith(today));

//   const addedByUser = products.filter(p => p.addedBy === username).length;


// const groupBy = (key: keyof Product) => {
//   const map: { [key: string]: number } = {};
//   products.forEach(p => {
//     const rawVal = p[key];
//     const val = typeof rawVal === "string" ? rawVal : String(rawVal);
//     map[val] = (map[val] || 0) + 1;
//   });
//   return map;
// };

//   const categoryStats = groupBy("category");
//   const brandStats = groupBy("brand");

//   return (
//     <Layout>
//       <div style={{ padding: "2rem" }}>
//         <h2>📈 Reports Dashboard</h2>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
//           <ReportCard title="Total Products" value={total} />
//           <ReportCard title="Approved Products" value={approved} />
//           <ReportCard title="Rejected Products" value={rejected} />
//           <ReportCard title="Pending Products" value={pending} />
//           <ReportCard title="Auto-Approved" value={autoApproved} />
//           <ReportCard title="Added Today" value={addedToday.length} />
//           <ReportCard title={`Added by You (${username})`} value={addedByUser} />
//         </div>

//         <hr style={{ margin: "2rem 0" }} />

//         <h3>📂 Products by Category</h3>
//         <StatTable stats={categoryStats} />

//         <h3 style={{ marginTop: "2rem" }}>🏷️ Products by Brand</h3>
//         <StatTable stats={brandStats} />
//       </div>
//     </Layout>
//   );
// };

// export default ReportsPage;

// // 📦 Small components

// interface CardProps {
//   title: string;
//   value: number;
// }

// const ReportCard: React.FC<CardProps> = ({ title, value }) => (
//   <div
//     style={{
//       border: "1px solid #ccc",
//       padding: "1rem",
//       borderRadius: "8px",
//       minWidth: "180px",
//       boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
//       background: "#f9f9f9",
//     }}
//   >
//     <h4>{title}</h4>
//     <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
//   </div>
// );

// interface StatTableProps {
//   stats: { [key: string]: number };
// }

// const StatTable: React.FC<StatTableProps> = ({ stats }) => (
//   <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
//     <thead>
//       <tr>
//         <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
//           Group
//         </th>
//         <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
//           Count
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {Object.entries(stats).map(([key, count]) => (
//         <tr key={key}>
//           <td style={{ padding: "0.5rem" }}>{key}</td>
//           <td style={{ padding: "0.5rem" }}>{count}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );
