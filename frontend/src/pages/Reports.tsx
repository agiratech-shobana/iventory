// // import React, { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { RootState } from "../store";
// // import { generateReport } from "../store/reportSlice";
// // const Reports = () => {
// //   const dispatch = useDispatch();
// //   const products = useSelector((state: RootState) => state.products.products);
// //   const report = useSelector((state: RootState) => state.report);

// //   useEffect(() => {
// //     dispatch(generateReport(products));
// //   }, [products, dispatch]);

// //   return (
// //     <div>
// //       <h2>Product Report</h2>
// //       <ul>
// //         <li>Total Products: {report.total}</li>
// //         <li>Approved: {report.approved}</li>
// //         <li>Rejected: {report.rejected}</li>
// //         <li>Pending: {report.pending}</li>
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Reports;


// import React, { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import { format, isToday, isThisWeek, isThisMonth } from "date-fns";

// const Reports: React.FC = () => {
//   const products = useSelector((state: RootState) => state.products.products);

//   const [filter, setFilter] = useState("All");

//   const filteredProducts = useMemo(() => {
//     return products.filter((p) => {
//       const createdAt = new Date(p.createdAt);
//       if (filter === "Today") return isToday(createdAt);
//       if (filter === "This Week") return isThisWeek(createdAt);
//       if (filter === "This Month") return isThisMonth(createdAt);
//       return true; // All
//     });
//   }, [products, filter]);

//   const total = filteredProducts.length;
  
// const approved = filteredProducts.filter(p => p.status === "approved").length;
// const rejected = filteredProducts.filter(p => p.status === "rejected").length;
// const pending = filteredProducts.filter(p => p.status === "pending").length;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Product Reports</h2>

//       <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ margin: "1rem 0", padding: "0.5rem" }}>
//         <option value="All">All</option>
//         <option value="Today">Today</option>
//         <option value="This Week">This Week</option>
//         <option value="This Month">This Month</option>
//       </select>

//       <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>Total Added: {total}</div>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>Approved: {approved}</div>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>Rejected: {rejected}</div>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>Pending: {pending}</div>
//       </div>

//       <table border={1} width="100%" cellPadding={10}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Added By</th>
//             <th>Status</th>
//             <th>Date Added</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((p) => (
//             <tr key={p.id}>
//               <td>{p.name}</td>
//               <td>{p.category}</td>
//               <td>{p.addedBy}</td>
//               <td>{p.status}</td>
//               <td>{format(new Date(p.createdAt), "dd-MM-yyyy hh:mm a")}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Reports;
