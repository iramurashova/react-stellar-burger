import { TUser } from "../services/reducers/userReducer/userReducer";
import { TIngredient, TNumberOrder, TOrder, TOrders } from "./types";

export const ingredientsArray: TIngredient[] = [
  {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "60666c42cc7b410027a1a9b5",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
  {
    _id: "60666c42cc7b410027a1a9b7",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0,
  },
];
export const fakeIngredient:TIngredient = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

export const fakeWsMessage: TOrders = {
  success: true,
  orders: [
    {
      _id: "some order id",
      status: "done",
      number: 1,
      createdAt: "2023-09-31T21:00:00",
      updatedAt: "2023-09-31T21:01:00",
      name: "some order name",
      ingredients: ["60666c42cc7b410027a1a9b6"],
    },
  ],
  total: 1,
  totalToday: 2,
};

export const fakeNumberOrder: TNumberOrder = {
  name: "Краторный метеоритный бургер",
  order: {
    number: 6257,
  },
  success: true,
};

export const fakeOrder: { ingredients: string[] } = {
  ingredients: ["609646e4dc916e00276b286e", "609646e4dc916e00276b2870"],
};
export const fakeUser: {
    user: TUser
} = {
    user: {
        email: 'test@test.ru',
        name: 'User'
    }

}
