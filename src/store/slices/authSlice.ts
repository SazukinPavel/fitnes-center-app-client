import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import AuthState from "../states/AuthState";
import Role from "../../types/Role";
import api from "../../api";
import LoginDto from "../../types/dto/auth/LoginDto";

const initialState: AuthState = {
  role: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<Role>) {
      state.role = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.role = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.user.role = action.payload.user.role;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { authorize, logout } = authSlice.actions;

export default authSlice.reducer;

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (loginDto: LoginDto) => {
    return await api.auth.login(loginDto);
  }
);
