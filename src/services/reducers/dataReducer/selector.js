export const selectIngredients = (store) =>
  store.ingredients.ingredientsFromApi;
export const selectIngredient = (store) =>
  store.ingredients.ingredientDetails.ingredient;
export const selectIngredientById = (id) => (store) =>
    store.ingredients.ingredientsFromApi.find((ingredients) => ingredients._id === id);
export const selectIsLoading = (store) => store.ingredients.isLoading;
export const selectIsError = (store) => store.ingredients.isError;
