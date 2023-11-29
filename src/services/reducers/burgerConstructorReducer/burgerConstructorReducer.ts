import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIngredient, TIngredientWithId } from "../../../utils/types";
type TConstructorState = {
  bun: TIngredientWithId | null,
  ingredients: TIngredientWithId[]
}
const initialState:TConstructorState = {
  bun: null,
  ingredients: [],
};


const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action:PayloadAction<TIngredientWithId>) => {
      if (action.payload.type !== "bun") {
        state.ingredients.push(action.payload);
      } else {
        state.bun = action.payload;
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._customId !== action.payload._customId
      );
    },
    changeIngredientsPlace: (state, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.ingredients.splice(indexFrom, 1);
      state.ingredients.splice(indexTo, 0, ingredient);
    },
    removeAllIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  changeIngredientsPlace,
  removeAllIngredients,
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
