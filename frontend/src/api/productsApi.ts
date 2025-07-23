import axios from "./axios"; // Import your custom axios instance

// Add Product
export const addProductAPI = async (product: {
  name: string;
  brand: string;
  stock: number;
  price: number;
  description: string;
  category: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  addedBy: string;
}) => {
  const response = await axios.post("products/addProduct", product);
  return response.data;
};

// Get All Products
export const getAllProductsAPI = async () => {
  const response = await axios.get("/products/getAllProducts");
  return response.data;
};

// Delete Product
export const deleteProductAPI = async (id: number) => {
  const response = await axios.delete(`/products/deleteProduct/${id}`);
  return response.data;
};

// Update Product
export const updateProductAPI = async (id: number, updatedData: any) => {
  const response = await axios.patch(`/products/updateProduct/${id}`, updatedData);
  return response.data;
};

// Get Dashboard Stats
export const getDashboardStatsAPI = async () => {
  const response = await axios.get("/products/getdashboardData");
  return response.data;
};

export const getDashboardStatsReport = async () => {
  const response = await axios.get("/reports/dashboard-stats"); // ✅ FIXED PATH
  return response.data;
};





