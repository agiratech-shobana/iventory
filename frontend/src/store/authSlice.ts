// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   username: string | null;
//   token: string | null;
//   role: string | null;
// }

// const initialState: AuthState = {
//   username: localStorage.getItem("username"),
//   token: localStorage.getItem("token"),
//   role: localStorage.getItem("role"),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<AuthState>) => {
//       state.username = action.payload.username;
//       state.token = action.payload.token;
//       state.role = action.payload.role;
//     },
//     logout: (state) => {
//       state.username = null;
//       state.token = null;
//       state.role = null;
//       localStorage.clear();
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {      //this handles the authentication slice
  username: string | null;
  token: string | null;
  role: string | null;
}

//  Load from localStorage  so login store aftere refreash
const initialState: AuthState = {
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
};

const authSlice = createSlice({  //create the redux slice and update the state
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.role = action.payload.role;

      // Save to localStorage
      localStorage.setItem("username", action.payload.username || "");
      localStorage.setItem("token", action.payload.token || "");
      localStorage.setItem("role", action.payload.role || "");

    },

    logout: (state) => {
      state.username = null;
      state.token = null;
      state.role = null;

      // 🧹 Clear localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
