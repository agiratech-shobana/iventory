import React from "react";
import "./summary.css";

const SummaryCards = ({ total, approved, pending, rejected, autoApproved }: any) => {
  return (
    <div className="summary-container">
      <div className="summary-card">Total: {total}</div>
      <div className="summary-card">Approved: {approved}</div>
      <div className="summary-card">Pending: {pending}</div>
      <div className="summary-card">Rejected: {rejected}</div>
      <div className="summary-card">Auto-Approved: {autoApproved}</div>
    </div>
  );
};

export default SummaryCards;
