// // src/pages/Products.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}
import { addProduct, updateProduct, deleteProduct, Product } from "../store/productSlice";
// import AddProductForm from "../components/AddProductPage";
import ProductForm from "../components/ProductForm";
import { AppDispatch } from "../store";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";

const Products = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [search, setSearch] = useState("");


  

  const handleAdd = (product: any) => {
    dispatch(addProduct(product));
    toast.success("✅ Product added successfully!");
    setShowForm(false);
  };

  const handleUpdate = (product: any) => {
    dispatch(updateProduct(product));
    toast.success("📝 Product updated!");
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);


    // here edit for each prid
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
     toast.error("❌ Product deleted.");

     // here need to call delete API for products
  };
 

  const filteredProducts = products.filter((p:Product) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Inventory</h2>
          <button onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}>
            + Add Product
          </button>
        </div>

        {showForm && (
          // <AddProductForm
          //   onAdd={handleAdd}
          //   onUpdate={handleUpdate}
          //   editingProduct={editingProduct}
          // />
          <ProductForm
  onSubmit={editingProduct ? handleUpdate : handleAdd}
  editingProduct={editingProduct}
/>

        )}

        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: "1rem 0", width: "100%", padding: "0.5rem" }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {filteredProducts.map((product:Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
             
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
