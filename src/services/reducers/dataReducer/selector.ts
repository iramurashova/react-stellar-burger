import { RootStore } from "../../store";

export const selectIngredients = (store: RootStore) =>
  store.data.ingredientsFromApi;
export const selectIngredient = (store: RootStore) =>
  store.data.ingredientDetails.ingredient;
export const selectIngredientById = (id?: string) => (store: RootStore) =>
  store.data.ingredientsFromApi.find((data) => data._id === id);
export const selectIngredientsIsLoading = (store: RootStore) =>
  store.data.ingredientsIsLoading;
export const selectIngredientsIsError = (store: RootStore) =>
  store.data.ingredientsIsError;
export const selectAllIngredients = (store: RootStore) => {
  const ingredients = store.burgerConstructor.ingredients;
  const bun = store.burgerConstructor.bun;
  return [...ingredients, bun];
};
export const selectOrders = (store: RootStore) => store.data.orders;
export const selectTotal = (store: RootStore) => store.data.orders?.total;
export const selectTotalToday = (store: RootStore) =>
  store.data.orders?.totalToday;
