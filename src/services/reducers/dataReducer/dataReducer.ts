import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients, fetchOrders } from "../../../utils/api";
import { TIngredient, TOrders } from "../../../utils/types";

type TDataState = {
  ingredientsFromApi: TIngredient[];
  ingredientsIsLoading: boolean;
  ingredientsIsError: boolean;
  ingredientDetails: {
    ingredient: TIngredient | null;
  };
  wsOpen: boolean;
  wsUrl: string;
  wsConnectionStatus: boolean;
  wsError: string | null;
  orders: TOrders | null;
};
export const initialDataState: TDataState = {
  ingredientsFromApi: [],
  ingredientsIsLoading: false,
  ingredientsIsError: false,
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
  initialState: initialDataState,
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
    setWebsocketClose: (state) => {
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
        state.ingredientsIsLoading = true;
        state.ingredientsIsError = false;
      })
      .addCase(getIngredientsData.fulfilled, (state, action) => {
        state.ingredientsFromApi = action.payload;
        state.ingredientsIsLoading = false;
        state.ingredientsIsError = false;
      })
      .addCase(getIngredientsData.rejected, (state) => {
        state.ingredientsIsLoading = false;
        state.ingredientsIsError = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
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
