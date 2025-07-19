// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../store";
// import { updateProduct, Product } from "../store/productSlice";
// import ProductForm from "../components/ProductForm";

// const EditProductPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const productId = Number(id);

//   const product = useSelector((state: RootState) =>
//     state.products.products.find((p) => p.id === productId)
//   );

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const handleUpdate = (updatedData: Product) => {
//     dispatch(updateProduct(updatedData));
//     alert("✅ Product updated successfully!");
//     navigate("/products");
//   };

//   if (!product) return <p>❌ Product not found.</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Edit Product</h2>
//       <ProductForm onSubmit={handleUpdate} initialData={product} />
//     </div>
//   );
// };

// export default EditProductPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Product, updateProduct } from "../store/productSlice";
import { toast } from "react-toastify";
import AddProductForm from "../components/AddProductPage";
import ProductForm from "../components/ProductForm";
import Layout from "../components/Layout";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id));
    if (found) {
      setEditingProduct(found);
    } else {
      toast.error("Product not found");
      navigate("/products");
    }
  }, [id, products, navigate]);

  const handleUpdate = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
    toast.success("Product updated!");
    navigate("/products");
  };

  if (!editingProduct) return null;

  return (
    <Layout>
      <div style={{ padding: "1rem" }}>
        <h2>Edit Product</h2>
        {/* <AddProductForm
          onAdd={() => {}}
          onUpdate={handleUpdate}
          editingProduct={editingProduct}
        /> */}
        <ProductForm onSubmit={handleUpdate} editingProduct={editingProduct} />

      </div>
    </Layout>
  );
};

export default EditProductPage;
