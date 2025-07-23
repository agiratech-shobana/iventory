
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../store/productSlice";
import Layout from "../components/Layout";

const MyProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const username = useSelector((state: RootState) => state.auth.username);

  const myProducts = products.filter(
    (product: Product) =>
      product.addedBy === username &&
      (product.status === "approved" || product.status === "rejected" || product.status === "pending")
  );

  const rejectedProducts = myProducts.filter((product) => product.status === "rejected");

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Step 3: Set unread count only once when the component loads
  useEffect(() => {
    if (rejectedProducts.length > 0) {
      setUnreadCount(rejectedProducts.length);
    }
  }, [rejectedProducts.length]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setUnreadCount(0); // Clear unread when opened
  };

  return (
    <Layout>
      <div style={{ padding: "20px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>My Added Products</h2>

          {/* Notification Bell */}
          <div style={{ position: "relative", cursor: "pointer" }} onClick={toggleNotifications}>
            <span style={{ fontSize: "24px" }}>🔔</span>
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Rejected Notifications List */}
        {showNotifications && rejectedProducts.length > 0 && (
          <div
            style={{
              background: "#fff8f8",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            <h4>Rejected Product Notifications</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {rejectedProducts.map((product) => (
                <li key={product.id} style={{ marginBottom: "6px", color: "#b10000" }}>
                  ❌ <strong>{product.name}</strong> - {product.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* My Product Table */}
        {myProducts.length === 0 ? (
          <p>You haven’t added any products yet.</p>
        ) : (
          <table
            style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Product Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((product, index) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{product.name}</td>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>{product.status}</td>
                  <td style={tdStyle}>{product.description}</td>
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

export default MyProductsPage;
