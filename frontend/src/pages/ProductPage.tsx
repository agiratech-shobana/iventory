import React, { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"; //used to acces the data from state in redux
import { RootState } from "../store";  //ts describe the strucutre of the global redux stae and dispathc used to send actions to redux
import {
  Product,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../store/productSlice";
import ProductForm from "../components/ProductForm"; //  Correct reusable form
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../store/productSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../store"; 
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; //used to navigate to other pages

const ProductPage = () => {
  const navigate = useNavigate(); //used to navigate to other pages
  // const dispatch = useDispatch(); //prepares the function to send actions to redux
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products); //pull list of all products from the store

  const [search, setSearch] = useState(""); //state for search input
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // filter by category
useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // if product is being edited it stores thAT PRODUCT OBJECT
  

  //ACTION HANDLERS
  // Add product
  const handleAdd = (product: Product) => {  //callback function to handle adding a product
    dispatch(addProduct(product)); //sends a action to redux to add a product
    toast.success("Product added successfully!");
    setShowForm(false); //hide forms after adding
  }; 

  // Update product
  const handleUpdate = (product: Product) => {
    // dispatch(updateProduct(product));
    dispatch(updateProduct({ id: product.id, updatedData: product }));

    toast.success("Product updated successfully!");
    setShowForm(false);
    setEditingProduct(null); //clear the poducct being edited
  };

  // Delete product
  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));  //redux action to remove a product from state
    toast.error(" Product deleted!");
  };

  // Edit trigger
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Filter by search
  const filtered = products.filter((p) =>
      p.status !== "rejected" && 
    p.name.toLowerCase().includes(search.toLowerCase()) &&
  (selectedCategory ==="" || p.category === selectedCategory) // filter by category
  );
  const categories = ["Books", "Electronics", "Clothing", "Furniture"];


  return (
    <Layout>
      <div style={{ padding: "1rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Inventory</h2>
          
          <button  onClick={() => navigate("/products/add")} style={{
    padding: "0.5rem 1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  }}>
  + Add Product
</button>
        </div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: "1rem 0", width: "100%", padding: "0.5rem" }}
        />
        {/* Category Filter */}

<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
>
  <option value="">All Categories</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>


        {/* Product Form for Add/Edit */}
        {showForm && (  //show form only if showform is true
          <ProductForm
            onSubmit={editingProduct ? handleUpdate : handleAdd}
            editingProduct={editingProduct ?? undefined} // FIX: convert null to undefined
          />
        )}

        {/* Product Cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
  {products.length === 0 ? (
    <p>No products available</p>
  ) : (
    products.map((product) => (
      <ProductCard
  key={product.id}
  product={product}
  onEdit={() => handleEdit(product)}
  onDelete={() => handleDelete(product.id)}
/>

    ))
  )}
</div>

        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
