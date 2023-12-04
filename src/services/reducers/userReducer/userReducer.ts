import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUser,
} from "../../../utils/api";
export type TUser = { name: string; email: string } | null
type TInitialState = {
  user: TUser;
  isAuthChecked: boolean;
  error:string | unknown;
  isEmailChecked: boolean;
};
export const initialUserState: TInitialState = {
  user: null,
  isAuthChecked: false,
  error: "",
  isEmailChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setAuthChecked: (state, action:PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setEmailChecked: (state, action:PayloadAction<boolean>) => {
      state.isEmailChecked = action.payload;
    },
    setUser: (state, action:PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = "";
      })
      .addCase(
        fetchRegister.rejected, (state, action) => {
          state.error = action.payload;
        })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = "";
      })
      .addCase(
        fetchLogin.rejected, (state, action) => {
          state.error = action.payload;
        })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.error = "";
      })
      .addCase(
        fetchLogout.rejected, (state, action) => {
          state.error = action.payload;
        })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = "";
      })
      .addCase(
        fetchUpdateUser.rejected, (state, action) => {
          state.error = action.payload;
        })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.error = "";
      })
      .addCase(
        fetchForgotPassword.rejected, (state, action) => {
          state.error = action.payload;
        })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.error = "";
      })
      .addCase(
        fetchResetPassword.rejected, (state, action) => {
          state.error = action.payload;
        })
  },
});

export const { setAuthChecked, setUser, setEmailChecked } = userSlice.actions;

export const userReducer = userSlice.reducer;
