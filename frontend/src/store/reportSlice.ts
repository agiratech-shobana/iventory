// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import { Product } from "./productSlice";

// interface ReportState {
//   total: number;
//   approved: number;
//   rejected: number;
//   pending: number;
// }

// const initialState: ReportState = {
//   total: 0,
//   approved: 0,
//   rejected: 0,
//   pending: 0,
// };

// const reportSlice = createSlice({
//   name: "report",
//   initialState,
//   reducers: {
//     generateReport: (state, action: { payload: Product[] }) => {
//       const products = action.payload;

//       state.total = products.length;
//       state.approved = products.filter(p => p.status === "approved").length;
//       state.rejected = products.filter(p => p.status === "rejected").length;
//       state.pending = products.filter(p => p.status === "pending").length;
//     },
//     resetReport: (state) => {
//       state.total = 0;
//       state.approved = 0;
//       state.rejected = 0;
//       state.pending = 0;
//     },
//   },
// });

// export const { generateReport, resetReport } = reportSlice.actions;

// // optional selector
// export const selectReport = (state: RootState) => state.report;

// export default reportSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "./productSlice"; // Assuming Product type is defined here

// Define the structure of the report state
interface ReportState {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}

// Initial state for reports
const initialState: ReportState = {
  total: 0,
  approved: 0,
  rejected: 0,
  pending: 0,
};

// Create the slice
const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    // Generate the report counts based on product array
    generateReport: (state, action: PayloadAction<Product[]>) => {
      const products = Array.isArray(action.payload) ? action.payload : [];

      state.total = products.length;
      state.approved = products.filter((p) => p.status === "approved").length;
      state.rejected = products.filter((p) => p.status === "rejected").length;
      state.pending = products.filter((p) => p.status === "pending").length;
    },

    // Reset all counts to zero
    resetReport: (state) => {
      state.total = 0;
      state.approved = 0;
      state.rejected = 0;
      state.pending = 0;
    },
  },
});

// Export actions
export const { generateReport, resetReport } = reportSlice.actions;

// Selector to access the report state in components
export const selectReport = (state: RootState) => state.report;

// Export reducer to be used in store
export default reportSlice.reducer;
