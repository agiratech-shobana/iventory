import React, { useEffect, useState } from "react";
import { Product } from "../store/productSlice";
import { categories } from "../utils/categories";
// import FormInput from "./FormInput";



interface ProductFormProps {
  onSubmit: (product: Product) => void;  //function to call when the form is submitted for both add and edit
  editingProduct?: Product;//optional prop for editing an existing product, if null it means we are adding a new product
}



const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, editingProduct }) => {
  const [formData, setFormData] = useState<Product>(
    editingProduct || {
      id: Date.now(),
      name: "",
     
      stock: 0,
      price:0,
      description: "",
      category: "",
      brand: "",
      image: "",
     status: "pending",  // default when adding a new product
      // addedBy: localStorage.getItem("currentUser") || "Unknown", 
      addedBy: localStorage.getItem("username") || "Unknown",
      autoApprove: false, // default value for auto-approve
      createdAt:"", // set current date as createdAt
      
    }
  );

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // const { name, value, type, checked } = e.target;
    const target = e.target as HTMLInputElement;
const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const currentUser = localStorage.getItem("username") || "Unknown";

  const updatedFormData = {
    ...formData,
    addedBy: currentUser,
    status: formData.autoApprove ? "approved" : "pending" as "approved" | "pending" | "rejected",
  };

  onSubmit(updatedFormData);
  console.log("Submitting product:", updatedFormData);
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />
      <input
  type="text"
  name="brand"
  placeholder="Brand (e.g., Nataraj, Apsara)"
  value={formData.brand}
  onChange={handleChange}
  required
/>
<br />

      <input
        type="number"
        name="stock"
        placeholder="Quantity"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input
  type="number"
  name="price"
  placeholder="Price"
  value={formData.price}
  onChange={handleChange}
  required
  
/>
<br />

    
      <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option value="Books">Books</option>
  <option value="Electronics">Electronics</option>
  <option value="Clothing">Clothing</option>
  <option value="Furniture">Furniture</option>
</select>

      <br />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <br />

      <input
  type="date"
  value={formData.createdAt}
  onChange={(e) =>
    setFormData({ ...formData, createdAt: e.target.value })
  }
/>

      
      {localStorage.getItem("role") === "admin" && (
  <label>
    <input
      type="checkbox"
      name="autoApprove"
      checked={formData.autoApprove}
      onChange={handleChange}
    />
    Auto-Approve
  </label>
)}
<br />
      <br />
      <button type="submit">{editingProduct ? "Update" : "Add"}</button>
    </form>
  );
};

export default ProductForm;
