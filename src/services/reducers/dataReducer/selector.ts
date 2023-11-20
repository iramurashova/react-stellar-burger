import { RootStore } from "../../store";

export const selectIngredients = (store: RootStore) =>
  store.ingredients.ingredientsFromApi;
export const selectIngredient = (store: RootStore) =>
  store.ingredients.ingredientDetails.ingredient;
export const selectIngredientById = (id:string | undefined) => (store: RootStore) =>
    store.ingredients.ingredientsFromApi.find((ingredients) => ingredients._id === id);
export const selectIsLoading = (store: RootStore) => store.ingredients.isLoading;
export const selectIsError = (store: RootStore) => store.ingredients.isError;
export const selectAllIngredients = (store: RootStore) => {
  const ingredients = store.burgerConstructor.ingredients;
  const bun = store.burgerConstructor.bun;
  return [...ingredients, bun];
}
