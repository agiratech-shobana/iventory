

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  brand: string;
  stock: number;
  price: number;
  description: string;
  category: string;
  image: string;
  status: 'pending' | 'approved' | 'rejected';
  addedBy: string;
  autoApprove?: boolean;
  createdAt: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// 👉 Async actions

// export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
//   const res = await axios.get('http://localhost:5000/api/products'); // replace with your backend URL
//   return res.data;
// });

// redux/productSlice.ts
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3003/api/products/getallProducts");
    return response.data; // Make sure your backend returns an array of products
  }
);


export const addProduct = createAsyncThunk(
  '/addproduct',
  async (product: Omit<Product, 'id'>) => {
    const res = await axios.post('http://localhost:3003/api/products/addProduct', product);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: number) => {
    await axios.delete(`http://localhost:3003/api/products/deleteProduct/${id}`);
    return id;
  }
);
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, updatedData }: { id: number; updatedData: Partial<Product> }) => {
    const response = await axios.patch(`http://localhost:3003/api/products/updateProduct/${id}`, updatedData);
    return response.data;
  }
);



// store/productSlice.ts
export const approveProduct = createAsyncThunk(
  "products/approveProduct",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3003/api/products/approve/${productId}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || "Error approving");
    }
  }
);

export const rejectProduct = createAsyncThunk(
  "products/rejectProduct",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3003/api/products/reject/${productId}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || "Error rejecting");
    }
  }
);




// Add more like `updateProduct`, `approveProduct`, `rejectProduct` as needed

// 👉 Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })

      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })

      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      
       .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
    const index = state.products.findIndex(p => p.id === action.payload.id);
    if (index !== -1) {
      state.products[index] = action.payload;
    }
  })


  .addCase(approveProduct.fulfilled, (state, action: PayloadAction<Product>) => {
    const product = state.products.find(p => p.id === action.payload.id);
    if (product) {
      product.status = 'approved';
    }
  })

  .addCase(rejectProduct.fulfilled, (state, action: PayloadAction<Product>) => {
    const product = state.products.find(p => p.id === action.payload.id);
    if (product) {
      product.status = 'rejected';
    }
  });
      





  },
});

export default productSlice.reducer;
