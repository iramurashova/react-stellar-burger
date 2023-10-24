import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/api";

const initialState = {
  ingredientsFromApi: [],
  isLoading: false,
  isError: false,
  ingredientDetails: {
    ingredient: null
  }
};

 export const getIngredientsData = createAsyncThunk(
  'ingredients/get',
  async (_, thunkAPI)  => {
    
    const data = await request('ingredients');
    return data.data;
  }
);

 const dataSlice = createSlice(
  {
    name: 'ingredients',
initialState,
reducers: {


getIngredientData: (state, action) => {
    state.ingredientDetails.ingredient = action.payload;
},
removeIngredientData: (state) => {
  state.ingredientDetails.ingredient = null;
}
},
extraReducers: (builder)=> {
  builder
  .addCase(getIngredientsData.pending, (state) => {
    state.isLoading = true;
    state.isError = false;
  })
  .addCase(getIngredientsData.fulfilled, (state, action) => {
    console.log(action.payload)
    state.ingredientsFromApi = action.payload;
    state.isLoading = false;
    state.isError = false;
  })
  .addCase(getIngredientsData.rejected, (state)=> {
    state.isLoading = false;
    state.isError = true;
  })
}
  }
)

export const {getIngredientData, removeIngredientData} = dataSlice.actions
export const dataReducer = dataSlice.reducer