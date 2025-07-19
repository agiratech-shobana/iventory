

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  brand:string
  quantity: number;
  description: string;
  category: string;
  image: string;
  // approved: boolean;
  status: "pending" | "approved" | "rejected"; 
  addedBy: string; // optional field to track who added the product
  autoApprove?: boolean; // optional field for auto-approval
   createdAt: string;
}

//  Load from localStorage or use default
const storedProducts = localStorage.getItem("products");
const storedNextId = localStorage.getItem("nextId");

interface ProductState {
  products: Product[];  //list of all product objects
  nextId: number; // a counter to give new products unique ID
}


//if values are found in localstorage ,use then and start with empty product list and nextId=1
const initialState: ProductState = {
  products: storedProducts ? JSON.parse(storedProducts) : [],
  nextId: storedNextId ? parseInt(storedNextId) : 1,
};

const saveToLocalStorage = (products: Product[], nextId: number) => {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("nextId", nextId.toString());
};//SAVE current product and id counter to localstorage

const productSlice = createSlice({  //create a slice of redux state called products
  name: "products",
  initialState,
  reducers: { // take a product object without id and add a new Id and pushes it to the array
    // addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
    //   const newProduct: Product = { ...action.payload, id: state.nextId, status: action.payload.status };
    //   state.products.push(newProduct);
    //   state.nextId++; //increments the nextid and save to local sotrage
    //   saveToLocalStorage(state.products, state.nextId); // Save
    // },
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
  const { name, brand } = action.payload;

  // Check if a product with the same name and brand already exists
  const exists = state.products.some(
    (product) =>
      product.name.toLowerCase() === name.toLowerCase() &&
      product.brand.toLowerCase() === brand.toLowerCase()
  );

  if (exists) {
    // You can handle this by showing a toast/alert in the component
    alert("Product with this name and brand already exists!");
    return; // Do not add
  }

  const newProduct: Product = {
    ...action.payload,
    id: state.nextId,
    status: action.payload.status,
     createdAt: new Date().toISOString()
  };

  state.products.push(newProduct);
  state.nextId++;
  saveToLocalStorage(state.products, state.nextId);
},

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        saveToLocalStorage(state.products, state.nextId); // Save
      }
    },//finds the product with the matching Id and replaces it with the updated version and saves to local storeage
    // deleteProduct: (state, action: PayloadAction<number>) => {
    //   state.products = state.products.filter(p => p.id !== action.payload);
    //   saveToLocalStorage(state.products, state.nextId); // Save
    // },

deleteProduct: (state, action: PayloadAction<number>) => {
  const filtered = state.products.filter(p => p.id !== action.payload);
  state.products = filtered;
  saveToLocalStorage(filtered, state.nextId); // use filtered, not state.products
},









    approveProduct: (state, action: PayloadAction<number>) => {
  const product = state.products.find(p => p.id === action.payload);
  if (product) {
    // product.approved = true;
    product.status = "approved";
    saveToLocalStorage(state.products, state.nextId);
  }
},rejectProduct: (state, action: PayloadAction<number>) => {
  const product = state.products.find(p => p.id === action.payload);
  if (product) {
    product.status = "rejected";
    saveToLocalStorage(state.products, state.nextId);
  }
},


  },
});

export const { addProduct, updateProduct, deleteProduct ,approveProduct,rejectProduct} = productSlice.actions;
export default productSlice.reducer;
