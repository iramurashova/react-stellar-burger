import { domenAdress } from "./constants";
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (endPoints, options) => {
  return fetch(`${domenAdress}/${endPoints}`, options).then(checkResponse);
};

export const fetchIngredients = async (_, thunkAPI) => {
  return request("ingredients").then((res) => res.data);
};

export const postOrder = async (ingredients, thunkAPI) => {

    return request("orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredients),
    });
  

};
