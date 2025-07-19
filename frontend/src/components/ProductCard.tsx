import React from "react";
import { Product } from "../store/productSlice"; //impport product type from redux slice for type safety
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product; // a product object to display
  onEdit: () => void;  //function called when edit button is clicked
  onDelete: () => void; //function called when delete button is clicked
}

const ProductCard: React.FC<Props> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        width: "250px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {product.image && ( // display the product name,category
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
        />
      )}
      <h3>{product.name}</h3>
      <p><strong>Qty:</strong> {product.quantity}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      {/* <p><strong>Status:</strong> {product.approved ? " Approved" : "⏳ Pending"}</p> */}
      <p><strong>Status:</strong> 
  {product.status === "approved" ? "✅ Approved" : 
   product.status === "pending" ? "⏳ Pending" : 
   "❌ Rejected"}
</p>

      <button
        onClick={() => navigate(`/products/edit/${product.id}`)}
        style={{ marginRight: "0.5rem", padding: "0.25rem 0.5rem" }}
      >
        Edit
      </button>
      {/* <button
        // onClick={() => onDelete(product.id)}
        style={{ padding: "0.25rem 0.5rem", backgroundColor: "#e74c3c", color: "#fff" }}
      >
        Delete
      </button> */}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ProductCard;
