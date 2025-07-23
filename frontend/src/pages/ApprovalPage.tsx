
import  { useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store"
import { approveProduct, rejectProduct, fetchProducts } from "../store/productSlice";
import Layout from "../components/Layout";

const ApprovalPage: React.FC = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>(); 
  // const username = localStorage.getItem("currentUser");

  // const products = useSelector((state: RootState) => state.products.products);
  // const pendingProducts = products.filter((product: Product) => product.status === "pending");
  // const role = useSelector((state: RootState) => state.auth.role);
  
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Filter products with pending status
  const pendingProducts = products.filter(
    (product) => product.status === "pending"
  );

  // ✅ Approve button handler
  const handleApprove = (productId: number) => {
    dispatch(approveProduct(productId));
  };

  // ✅ Reject button handler
  const handleReject = (productId: number) => {
    dispatch(rejectProduct(productId));
  };









  return (
    <Layout>
      
      {/* <div style={{ padding: "20px" }}>
        <h2>🕒 Approval Queue</h2>
        <h3 style={{ padding: "10px 20px" }}>👋 Welcome, {username}</h3>
        {role !== "admin" && (
      <p style={{ color: "red", fontWeight: "bold", marginBottom: "1rem" }}>
        ⚠️ You are not authorized to approve or reject products.
      </p>
    )}
        {pendingProducts.length === 0 ? (
          <p>No pending products to review.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Product Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Added By</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts.map((product, index) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{product.name}</td>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>{product.addedBy}</td>
                  <td style={tdStyle}>{product.description}</td>
                  <td style={tdStyle}>
                   
                    {localStorage.getItem("role") === "admin" ? (
  <button
    onClick={() => dispatch(approveProduct(product.id))}
    style={approveBtn}
  >
    ✅ Approve
  </button>
) : (
  <button
    style={{ ...approveBtn, opacity: 0.6, cursor: "not-allowed" }}
    onClick={() => alert("❌ 403 Unauthorized: Only admin can approve.")}
    disabled
  >
    ✅ Approve
  </button>
)}

{localStorage.getItem("role") === "admin" ? (
  <button
    onClick={() => dispatch(rejectProduct(product.id))}
    style={rejectBtn}
  >
    ❌ Reject
  </button>
) : (
  <button
    style={{ ...rejectBtn, opacity: 0.6, cursor: "not-allowed" }}
    onClick={() => alert("❌ 403 Unauthorized: Only admin can reject.")}
    disabled
  >
    ❌ Reject
  </button>
)}

+

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}

       <div>
      <h2>Pending Product Approvals</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : pendingProducts.length === 0 ? (
        <p>No pending products to review.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    onClick={() => handleApprove(product.id)}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "green",
                      color: "#fff",
                      padding: "5px 10px",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product.id)}
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      padding: "5px 10px",
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left" as const,
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const approveBtn = {
  backgroundColor: "green",
  color: "white",
  padding: "5px 10px",
  marginRight: "8px",
  border: "none",
  cursor: "pointer",
};

const rejectBtn = {
  backgroundColor: "red",
  color: "white",
  padding: "5px 10px",
  border: "none",
  cursor: "pointer",
};

export default ApprovalPage;
