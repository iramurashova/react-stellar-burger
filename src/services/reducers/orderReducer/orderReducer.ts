import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../../../utils/api";

export const getOrderDetails = createAsyncThunk("order/post", postOrder);
type TOrderState = {
  order: {  number: number | null };
  success: boolean;
  isLoading: boolean;
  isError: boolean;
};
export const initialOrderState: TOrderState = {
  order: {  number: null },
  success: false,
  isLoading: false,
  isError: false,
};

const orderSlice = createSlice({
  name: "orderDetails",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.success = false;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.isError = false;
        state.success = action.payload.success;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
        state.isError = true;
      });
  },
});
export const orderReducer = orderSlice.reducer;
