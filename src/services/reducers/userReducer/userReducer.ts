import { createSlice } from "@reduxjs/toolkit";
import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUser,
} from "../../../utils/api";

type TInitialState = {
  user: { name: string; email: string };
  isAuthChecked: boolean;
  error: {} | null;
  isEmailChecked: boolean;
};
const initialState: TInitialState = {
  user: {
    name: '',
    email: ''
  },
  isAuthChecked: false,
  error: null,
  isEmailChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setEmailChecked: (state, action) => {
      state.isEmailChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = {
          name: '',
          email: ''
        };
        state.error = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export const { setAuthChecked, setUser, setEmailChecked } = userSlice.actions;

export const userReducer = userSlice.reducer;