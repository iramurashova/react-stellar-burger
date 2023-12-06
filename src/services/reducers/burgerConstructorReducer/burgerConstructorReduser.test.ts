import {
  fakeBunWithId,
  fakeBurgerConstructor,
  fakeIngredientWithId,
} from "../../../utils/data";
import {
  addIngredient,
  burgerConstructorReducer,
  changeIngredientsPlace,
  initialConstructorState,
  removeAllIngredients,
  removeIngredient,
} from "./burgerConstructorReducer";

describe("Testing dataSlice", () => {
  test("Return initialState", () => {
    expect(burgerConstructorReducer(undefined, { type: undefined })).toEqual(
      initialConstructorState
    );
  });
  test("Add ingredient with type bun", () => {
    expect(
      burgerConstructorReducer(
        initialConstructorState,
        addIngredient(fakeBunWithId)
      )
    ).toEqual({
      ...initialConstructorState,
      bun: fakeBunWithId,
    });
  });
  test("Add ingredient with another type", () => {
    expect(
      burgerConstructorReducer(
        initialConstructorState,
        addIngredient(fakeIngredientWithId)
      )
    ).toEqual({
      ...initialConstructorState,
      ingredients: [
        ...initialConstructorState.ingredients,
        fakeIngredientWithId,
      ],
    });
  });
  test("Remove ingredient", () => {
    expect(
      burgerConstructorReducer(
        fakeBurgerConstructor,
        removeIngredient(fakeBurgerConstructor.ingredients[0])
      )
    ).toEqual({
      bun: fakeBurgerConstructor.bun,
      ingredients: [fakeBurgerConstructor.ingredients[1]],
    });
  });
  test("Change ingredient place", () => {
    expect(
      burgerConstructorReducer(
        fakeBurgerConstructor,
        changeIngredientsPlace({
          indexFrom: 0,
          indexTo: 1,
          ingredient: fakeBurgerConstructor.ingredients[0],
        })
      )
    ).toEqual({
      bun: fakeBurgerConstructor.bun,
      ingredients: [
        fakeBurgerConstructor.ingredients[1],
        fakeBurgerConstructor.ingredients[0],
      ],
    });
  });
  test("Remove all ingredients", () => {
    expect(
      burgerConstructorReducer(fakeBurgerConstructor, removeAllIngredients())
    ).toEqual(initialConstructorState);
  });
});
