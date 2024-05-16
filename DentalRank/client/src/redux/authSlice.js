import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const res = await axios.get(
      "https://dentalrank.onrender.com/set-authentication", 
      { withCredentials: true }
    );
    const data = await res.data;
    console.log("RETURN", data);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action.payload;
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
