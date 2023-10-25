import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../../../utils/api";

export const postOrderDetails = createAsyncThunk("order/post", postOrder);
const initialState = {
  order: {},
  success: false,
  isLoading: false,
  isError: false,
};

const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.success = false;
      })
      .addCase(postOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.isError = false;
        state.success = action.payload.success;
      })
      .addCase(postOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isError = true;
        console.error(action.error);
      });
  },
});
export const orderReducer = orderSlice.reducer;
