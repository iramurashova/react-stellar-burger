export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};

export type TIngredientWithId = TIngredient & { _customId: string };
export type TVoidWithoutParams = () => void;
export interface IValues {
  [name: string]: string;
}
export type TOrders = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
