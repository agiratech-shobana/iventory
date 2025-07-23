
import Layout from "../components/Layout";
import React from "react";
import { useSelector } from "react-redux";



const UserDashboard = () => {
       const unreadCount = useSelector((state: any) => state.notifications.unreadCount);

  return (
    <Layout>
    <div style={{ padding: "2rem" }}>
      <h1>User Dashboard</h1>
      <p>Welcome, User! You can view and add your inventory items.</p>
       <p>Unread Products: {unreadCount}</p>
    </div>
    </Layout>
  );
};

export default UserDashboard;
