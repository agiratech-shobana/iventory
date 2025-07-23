// import React from "react";
// import { Product } from "../store/productSlice"; //impport product type from redux slice for type safety
// import { useNavigate } from "react-router-dom";

// interface Props {
//   product: Product; // a product object to display
//   onEdit: () => void;  //function called when edit button is clicked
//   onDelete: () => void; //function called when delete button is clicked
// }

// const ProductCard: React.FC<Props> = ({ product, onDelete }) => {
//   const navigate = useNavigate();
//   const role= localStorage.getItem("role");

//   return (
//     <div className="product-card"
      
//     >
//       {product.image && ( // display the product name,category
//         <img
//           src={product.image}
//           alt={product.name}
//           style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
//         />
//       )}
//       <h3 className="product-title">{product.name}</h3>
//       <p className="product-detail"><strong>Qty:</strong> {product.stock}</p>
//       <p className="product-detail"><strong>Category:</strong> {product.category}</p>
//       <p className="product-detail"><strong>Brand:</strong> {product.brand}</p>
//       <p className="product-detail"><strong>Price:</strong> ₹{product.price}</p>

//       {/* <p><strong>Status:</strong> {product.approved ? " Approved" : "⏳ Pending"}</p> */}
//       <p className="product-detail"><strong>Status:</strong> 
//   {product.status === "approved" ? "✅ Approved" : 
//    product.status === "pending" ? "⏳ Pending" : 
//    "❌ Rejected"}
// </p>
//       <div className="button-group">
//       <button className="edit-button"
//         onClick={() => navigate(`/products/edit/${product.id}`)}
//         // style={{ marginRight: "0.5rem", padding: "0.25rem 0.5rem" }}
//       >
//         Edit
//       </button>
//       {/* <button
//         // onClick={() => onDelete(product.id)}
//         style={{ padding: "0.25rem 0.5rem", backgroundColor: "#e74c3c", color: "#fff" }}
//       >
//         Delete
//       </button> */}
//       {role==="admin" && (
//       <button onClick={onDelete}  className="delete-button">Delete</button>

//       )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// src/components/ProductCard.tsx
import React from "react";
import { Product } from "../store/productSlice"; // adjust the path if needed

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

function handleBill (stock:number,price:number,name:string) {
  const total = stock * price;
  alert(
    `🧾 Bill Summary:\n\n` +
    `Product: ${name}\n` +
    `Stock: ${stock}\n` +
    `Price: ₹${price}\n` +
    `--------------------------\n` +
    `Total: ₹${total}\n\n` +
    `Click OK to generate bill.`
  );
  // Here you can add further logic to actually "generate" the bill
};


const ProductCard: React.FC<Props> = ({ product, onEdit, onDelete }) => {
   const role = localStorage.getItem("role");
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Status:</strong> {
        product.status === "approved" ? "✅ Approved" :
        product.status === "pending" ? "⏳ Pending" : "❌ Rejected"
      }</p>
      {/* <div style={styles.buttons}>
        <button style={styles.editBtn} onClick={onEdit}>Edit</button>
        <button style={styles.deleteBtn} onClick={onDelete}>Delete</button>
      </div> */}
       {role === "admin" && (
        <div style={styles.buttons}>
          <button style={styles.editBtn} onClick={onEdit}>Edit</button>
          {/* <button style={styles.deleteBtn} >Delete</button> */}
          <button
  style={styles.deleteBtn}
  onClick={() => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${product.name}"?`);
    if (confirmDelete) {
      onDelete();
    }
  }}
>
  Delete
</button>
<button style={styles.editBtn} onClick={()=>handleBill(product.stock,product.price,product.name)}>bill</button>


        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "16px",
    width: "300px",
    margin: "1rem",
    textAlign: "left" as const,
    backgroundColor: "#fdfdfd",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover" as const,
    borderRadius: "8px",
    marginBottom: "10px"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px"
  },
  editBtn: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ProductCard;

