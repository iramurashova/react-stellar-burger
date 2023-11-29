import { RootStore } from "../../store";

export const selectIngredients = (store: RootStore) =>
  store.data.ingredientsFromApi;
export const selectIngredient = (store: RootStore) =>
  store.data.ingredientDetails.ingredient;
export const selectIngredientById =
  (id: string | undefined) => (store: RootStore) =>
    store.data.ingredientsFromApi.find((data) => data._id === id);
export const selectOrderByNumber =
  (id: string | undefined) => (store: RootStore) =>
    store.data.orders?.orders.find(
      (item) => item.number.toString() === id 
    );
// export const selectIngredientsByOrder = 
export const selectIsLoading = (store: RootStore) => store.data.isLoading;
export const selectIsError = (store: RootStore) => store.data.isError;
export const selectAllIngredients = (store: RootStore) => {
  const ingredients = store.burgerConstructor.ingredients;
  const bun = store.burgerConstructor.bun;
  return [...ingredients, bun];
};
export const selectOrders = (store: RootStore) => store.data.orders;
export const selectTotal = (store: RootStore) => store.data.orders?.total;
export const selectTotalToday = (store: RootStore) =>
  store.data.orders?.totalToday;

