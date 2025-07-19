// import React, { useRef } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import { Pie } from "react-chartjs-2";
// import "chart.js/auto";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const AdminReports = () => {
//   const reportRef = useRef<HTMLDivElement>(null);
//   const products = useSelector((state: RootState) => state.products.products);

//   const total = products.length;
//   const approved = products.filter(p => p.status === "approved").length;
//   const pending = products.filter(p => p.status === "pending").length;
//   const rejected = products.filter(p => p.status === "rejected").length;
//   const autoApproved = products.filter(p => p.autoApprove === true).length;

//   const recent = [...products]
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//     .slice(0, 5);

//   const pieData = {
//     labels: ["Approved", "Pending", "Rejected"],
//     datasets: [
//       {
//         label: "Approval Status",
//         data: [approved, pending, rejected],
//         backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const handleGenerateReport = async () => {
//     if (!reportRef.current) return;

//     const canvas = await html2canvas(reportRef.current);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("Admin-Product-Report.pdf");

//     alert("✅ Report downloaded successfully!");
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <div ref={reportRef}>
//         <h2>📊 Reports</h2>

//         {/* Summary Cards */}
//         <div
//           style={{
//             display: "flex",
//             gap: "1rem",
//             margin: "1rem 0",
//             flexWrap: "wrap",
//           }}
//         >
//           <Card title="Total Products" value={total} />
//           <Card title="Approved" value={approved} />
//           <Card title="Pending" value={pending} />
//           <Card title="Rejected" value={rejected} />
//           <Card title="Auto Approved" value={autoApproved} />
//         </div>

//         {/* Recent Table */}
//         <h3>🆕 Recent Products</h3>
//         <table
//           border={1}
//           cellPadding={10}
//           style={{ width: "100%", marginBottom: "2rem" }}
//         >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Category</th>
//               <th>Qty</th>
//               <th>Added By</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recent.map(p => (
//               <tr key={p.id}>
//                 <td>{p.name}</td>
//                 <td>{p.brand}</td>
//                 <td>{p.category}</td>
//                 <td>{p.quantity}</td>
//                 <td>{p.addedBy}</td>
//                 <td>{new Date(p.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pie Chart */}
//         <div style={{ maxWidth: "400px", marginBottom: "2rem" }}>
//           <Pie data={pieData} />
//         </div>
//       </div>

//       {/* Generate Button */}
//       <div style={{ textAlign: "center", marginTop: "2rem" }}>
//         <button
//           onClick={handleGenerateReport}
//           style={{
//             padding: "0.5rem 1rem",
//             background: "blue",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             fontSize: "16px",
//           }}
//         >
//           Generate Report
//         </button>
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value }: { title: string; value: number }) => (
//   <div
//     style={{
//       background: "#f5f5f5",
//       padding: "1rem",
//       borderRadius: "8px",
//       minWidth: "150px",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     }}
//   >
//     <h4>{title}</h4>
//     <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
//   </div>
// );

// export default AdminReports;
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminReports = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const products = useSelector((state: RootState) => state.products.products);
  const [filter, setFilter] = useState("full");

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const filteredProducts = products.filter((p) => {
    const productDate = new Date(p.createdAt);
    if (filter === "daily") {
      return productDate.toDateString() === today.toDateString();
    } else if (filter === "weekly") {
      return productDate >= startOfWeek && productDate <= today;
    } else if (filter === "monthly") {
      return productDate >= startOfMonth && productDate <= today;
    }
    return true; // full
  });

  const total = filteredProducts.length;
  const approved = filteredProducts.filter(p => p.status === "approved").length;
  const pending = filteredProducts.filter(p => p.status === "pending").length;
  const rejected = filteredProducts.filter(p => p.status === "rejected").length;
  const autoApproved = filteredProducts.filter(p => p.autoApprove === true).length;

  const recent = [...filteredProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Approval Status",
        data: [approved, pending, rejected],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const handleGenerateReport = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Admin-Product-Report.pdf");

    alert("✅ Report downloaded successfully!");
  };

  console.log(products);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Reports</h2>

      {/* Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Filter Report:&nbsp;</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="full">Full</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div ref={reportRef}>
        {/* Summary Cards */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            margin: "1rem 0",
            flexWrap: "wrap",
          }}
        >
          <Card title="Total Products" value={total} />
          <Card title="Approved" value={approved} />
          <Card title="Pending" value={pending} />
          <Card title="Rejected" value={rejected} />
          <Card title="Auto Approved" value={autoApproved} />
        </div>

        {/* Recent Table */}
        <h3>🆕 Recent Products</h3>
        <table
          border={1}
          cellPadding={10}
          style={{ width: "100%", marginBottom: "2rem" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Added By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>{p.quantity}</td>
                <td>{p.addedBy}</td>
                
                   <td>
  {p.createdAt && !isNaN(Date.parse(p.createdAt))
    ? new Date(p.createdAt).toISOString().slice(0, 10)
    : "N/A"}
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Pie Chart */}
        <div style={{ maxWidth: "400px", marginBottom: "2rem" }}>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Generate Button */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleGenerateReport}
          style={{
            padding: "0.5rem 1rem",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: number }) => (
  <div
    style={{
      background: "#f5f5f5",
      padding: "1rem",
      borderRadius: "8px",
      minWidth: "150px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }} 
  >
    <h4>{title}</h4>
    <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
  </div>
);

export default AdminReports;
