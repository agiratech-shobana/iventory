
import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  quantity: number;
  description: string;
  category: string;
  image: string;
  approved: boolean;
}

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<Props> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        margin: "1rem",
        width: "250px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
        />
      )}
      <h3>{product.name}</h3>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Status:</strong> {product.approved ? "Approved" : "Pending"}</p>
      <p><strong>Category:</strong> {product.category}</p>

      <button
        onClick={() => navigate(`/products/edit/${product.id}`)}
        style={{ marginRight: "0.5rem", padding: "0.25rem 0.5rem" }}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(product.id)}
        style={{ padding: "0.25rem 0.5rem", backgroundColor: "#e74c3c", color: "#fff" }}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
