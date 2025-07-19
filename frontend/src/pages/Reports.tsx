import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { generateReport } from "../store/reportSlice";
const Reports = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const report = useSelector((state: RootState) => state.report);

  useEffect(() => {
    dispatch(generateReport(products));
  }, [products, dispatch]);

  return (
    <div>
      <h2>Product Report</h2>
      <ul>
        <li>Total Products: {report.total}</li>
        <li>Approved: {report.approved}</li>
        <li>Rejected: {report.rejected}</li>
        <li>Pending: {report.pending}</li>
      </ul>
    </div>
  );
};

export default Reports;
