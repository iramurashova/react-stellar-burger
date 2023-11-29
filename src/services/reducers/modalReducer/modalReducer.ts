import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TModalState = {
  isOpen: boolean,
  typeOfModal: string | null,
}
const initialState:TModalState = {
  isOpen: false,
  typeOfModal: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action:PayloadAction<string | null>) => {
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
