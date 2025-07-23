
// // // import React, { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { RootState } from "../store";
// // // import { Product, updateProduct } from "../store/productSlice";
// // // import { toast } from "react-toastify";
// // // import AddProductForm from "../components/AddProductPage";
// // // import ProductForm from "../components/ProductForm";
// // // import Layout from "../components/Layout";

// // // const EditProductPage = () => {
// // //   const { id } = useParams<{ id: string }>();
// // //   const navigate = useNavigate();
// // //   const dispatch = useDispatch();
// // //   const products = useSelector((state: RootState) => state.products.products);

// // //   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

// // //   useEffect(() => {
// // //     const found = products.find((p) => p.id === Number(id));
// // //     if (found) {
// // //       setEditingProduct(found);
// // //     } else {
// // //       toast.error("Product not found");
// // //       navigate("/products");
// // //     }
// // //   }, [id, products, navigate]);

// // //   const handleUpdate = (updatedProduct: Product) => {
// // //     dispatch(updateProduct(updatedProduct));
// // //     toast.success("Product updated!");
// // //     navigate("/products");
// // //   };

// // //   if (!editingProduct) return null;

// // //   return (
// // //     <Layout>
// // //       <div style={{ padding: "1rem" }}>
// // //         <h2>Edit Product</h2>
// // //         {/* <AddProductForm
// // //           onAdd={() => {}}
// // //           onUpdate={handleUpdate}
// // //           editingProduct={editingProduct}
// // //         /> */}
// // //         <ProductForm onSubmit={handleUpdate} editingProduct={editingProduct} />

// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default EditProductPage;
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { RootState } from "../store";
// // import { Product, updateProduct } from "../store/productSlice";
// // import { toast } from "react-toastify";
// // import ProductForm from "../components/ProductForm";
// // import Layout from "../components/Layout";
// // import { updateProductAPI } from "../api/productsApi"; // Import API

// // const EditProductPage = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const products = useSelector((state: RootState) => state.products.products);

// //   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

// //   useEffect(() => {
// //     const found = products.find((p) => p.id === Number(id));
// //     if (found) {
// //       setEditingProduct(found);
// //     } else {
// //       toast.error("Product not found");
// //       navigate("/products");
// //     }
// //   }, [id, products, navigate]);

// //   const handleUpdate = async (updatedProduct: Product) => {
// //     try {
// //       const updatedData = await updateProductAPI(Number(id), updatedProduct); // API call
// //       dispatch(updateProduct(updatedData)); // Update Redux
// //       toast.success("Product updated!");
// //       navigate("/products");
// //     } catch (error) {
// //       toast.error("Failed to update product");
// //       console.error(error);
// //     }
// //   };

// //   if (!editingProduct) return null;

// //   return (
// //     <Layout>
// //       <div style={{ padding: "1rem" }}>
// //         <h2>Edit Product</h2>
// //         <ProductForm onSubmit={handleUpdate} editingProduct={editingProduct} />
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default EditProductPage;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../store";
// import { Product, updateProduct as updateProductRedux } from "../store/productSlice";
// import { toast } from "react-toastify";
// import { AppDispatch } from "../store";
// import ProductForm from "../components/ProductForm";
// import Layout from "../components/Layout";
// import { updateProductAPI } from "../api/productsApi"; // ✅ Import API

// const EditProductPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
//   const dispatch = useDispatch<AppDispatch>();
//   const products = useSelector((state: RootState) => state.products.products);

//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const found = products.find((p) => p.id === Number(id));
//     if (found) {
//       setEditingProduct(found);
//     } else {
//       toast.error("Product not found");
//       navigate("/products");
//     }
//   }, [id, products, navigate]);

//   const handleUpdate = async (updatedProduct: Product) => {
//     try {
//       await updateProductAPI(Number(id), updatedProduct); // ✅ Update DB
//       // dispatch(updateProductRedux(updatedProduct));        // ✅ Update Redux
//       dispatch(updateProductRedux({ id: updatedProduct.id, updatedData: updatedProduct }));

//       toast.success("Product updated successfully!");
//       navigate("/products");
//     } catch (error) {
//       console.error("Update failed", error);
//       toast.error("Failed to update product.");
//     }
//   };

//   if (!editingProduct) return null;

//   return (
//     <Layout>
//       <div style={{ padding: "1rem" }}>
//         <h2>Edit Product</h2>
//         <ProductForm onSubmit={handleUpdate} editingProduct={editingProduct} />
//       </div>
//     </Layout>
//   );
// };

// export default EditProductPage;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import ProductForm from "../components/ProductForm";
// import Layout from "./Layout";
import Layout from "../components/Layout";
import { updateProduct } from "../store/productSlice"; // your redux action
import { toast } from "react-toastify";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const handleEdit = async (updatedProduct: any) => {
    try {
      dispatch(updateProduct(updatedProduct)); // Update in Redux
      toast.success("✅ Product updated successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("❌ Failed to update product");
      console.error("Edit error", error);
    }
  };

  if (!product) return <p>Product not found</p>;

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <h2>Edit Product</h2>
        <ProductForm onSubmit={handleEdit} editingProduct={product} />
      </div>
    </Layout>
  );
};

export default EditProductPage;
