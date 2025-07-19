
// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import EditProductPage from "./pages/EditProductPage";
import ProductPage from "./pages/ProductPage";
import ApprovalPage from "./pages/ApprovalPage";
import MyProductsPage from "./pages/MyProductPage";
import AddProductPage from "./components/AddProductPage";
import Reports from "./pages/Reports";
import AdminReports from "./pages/AdminReports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route
  path="/admin"
  element={
    <PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />
  }
/>

        
        
        
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/add" element={<AddProductPage />} />

        <Route path="/products/edit/:id" element={<EditProductPage />} />
          <Route path="/approval" element={<ApprovalPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
        <Route path="/report" element={<Reports />} />
          <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
};

export default App;
