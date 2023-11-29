import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients, fetchOrder } from "../../../utils/api";
import { TIngredient, TOrders } from "../../../utils/types";

type TDataState = {
  ingredientsFromApi: TIngredient[];
  isLoading: boolean;
  isError: boolean;
  ingredientDetails: {
    ingredient: TIngredient | null;
  };
  wsOpen: boolean;
  wsUrl: string;
  wsConnectionStatus: boolean;
  wsError: string | null;
  orders: TOrders | null;
};
const initialState: TDataState = {
  ingredientsFromApi: [],
  isLoading: false,
  isError: false,
  ingredientDetails: {
    ingredient: null,
  },
  wsOpen: false,
  wsUrl: "",
  wsConnectionStatus: true,
  wsError: null,
  orders: null,
};

export const getIngredientsData = createAsyncThunk(
  "data/ingredients/get",
  fetchIngredients
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getIngredientData: (state, action: PayloadAction<TIngredient>) => {
      state.ingredientDetails.ingredient = action.payload;
    },
    removeIngredientData: (state) => {
      state.ingredientDetails.ingredient = null;
    },
    setWebsocketOpen: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    setWebsocketClose: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = false;
      state.wsUrl = "";
      state.orders = null;
      state.wsError = null;
    },
    setWebsocketConnection: (state, action: PayloadAction<string>) => {
      state.wsConnectionStatus = true;
      state.wsUrl = action.payload;
    },
    setWebsocketConnectionError: (
      state,
      action: PayloadAction<null | string>
    ) => {
      state.wsError = action.payload;
    },
    setWebsocketOffline: (state) => {
      state.wsConnectionStatus = false;
    },
    setWebsocketGetOrders: (state, action: PayloadAction<TOrders>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getIngredientsData.fulfilled, (state, action) => {
        state.ingredientsFromApi = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getIngredientsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const {
  getIngredientData,
  removeIngredientData,
  setWebsocketOpen,
  setWebsocketClose,
  setWebsocketConnection,
  setWebsocketConnectionError,
  setWebsocketOffline,
  setWebsocketGetOrders,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
