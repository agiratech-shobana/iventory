// // src/pages/ProductListPage.tsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   stock: number;
//   image: string;
// };

// const ProductListPage: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/getAllProducts')
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Available Products</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//         {products.map((product) => (
//           <div
//             key={product.id}
//             style={{
//               border: '1px solid #ddd',
//               padding: '1rem',
//               borderRadius: '8px',
//               width: '250px',
//               boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//             }}
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               style={{ width: '100%', height: '150px', objectFit: 'cover' }}
//             />
//             <h4>{product.name}</h4>
//             <p>{product.description}</p>
//             <p><strong>Price:</strong> ₹{product.price}</p>
//             <p><strong>Stock:</strong> {product.stock}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductListPage;
