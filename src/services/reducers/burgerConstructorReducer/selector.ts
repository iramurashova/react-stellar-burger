import { RootStore } from "../../store";

export const selectBurgerIngredients = (store: RootStore) =>
  store.burgerConstructor.ingredients;
export const selectBurgerBun = (store: RootStore) =>
  store.burgerConstructor.bun;
