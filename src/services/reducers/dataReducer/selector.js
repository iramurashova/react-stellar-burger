export const selectIngredients = (store) =>
  store.ingredients.ingredientsFromApi;
export const selectIngredient = (store) =>
  store.ingredients.ingredientDetails.ingredient;
export const selectIsLoading = (store) => store.ingredients.isLoading;
export const selectIsError = (store) => store.ingredients.isError;
