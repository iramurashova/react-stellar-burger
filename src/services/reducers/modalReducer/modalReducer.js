import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  typeOfModal: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.typeOfModal = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.typeOfModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
