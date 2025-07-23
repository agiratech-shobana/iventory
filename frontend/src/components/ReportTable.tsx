import React from "react";

const ReportTable = ({ products }: any) => {
  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Added By</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod: any, index: number) => (
          <tr key={index}>
            <td>{prod.name}</td>
            <td>{prod.brand}</td>
            <td>{prod.category}</td>
            <td>{prod.quantity}</td>
            <td>{prod.addedBy}</td>
            <td>{prod.status}</td>
            <td>{new Date(prod.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
