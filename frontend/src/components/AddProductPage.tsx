
// // export default AddProductForm;
// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Product } from "../store/productSlice";
// import { addProduct } from "../store/productSlice";
// import { AppDispatch } from "../store";
// import ProductForm from "../components/ProductForm";
// import Layout from "./Layout";
// const AddProductPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const handleAdd = (productData: Omit<Product, "id">) => {
//     dispatch(addProduct(productData));
//     alert("✅ Product added successfully!");
//     navigate("/products");
//   };

//   return (
//     <Layout>
//     <div style={{ padding: "2rem" }}>
//       <h2>Add Product</h2>
//       <ProductForm onSubmit={handleAdd} />
//     </div>
//     </Layout>
//   );
  
// };

// export default AddProductPage;
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product } from "../store/productSlice";
import { addProduct as addProductRedux } from "../store/productSlice";
import { AppDispatch } from "../store";
import ProductForm from "../components/ProductForm";
import Layout from "./Layout";
import { addProductAPI } from "../api/productsApi"; // ✅ import the backend API
import { toast } from "react-toastify"; // ✅ use toast for feedback

const AddProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAdd = async (productData: Omit<Product, "id">) => {
    try {
      await addProductAPI(productData); // ✅ Save to DB
      // dispatch(addProductRedux(addedProduct)); // ✅ Update Redux
      toast.success("Product added successfully!"); // ✅ Feedback
      navigate("/products");
    } catch (error) {
      console.error("Failed to add product", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <h2>Add Product</h2>
        <ProductForm onSubmit={handleAdd} />
      </div>
    </Layout>
  );
};

export default AddProductPage;
