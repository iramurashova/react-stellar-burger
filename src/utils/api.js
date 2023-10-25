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
  try {
    const data = await request("ingredients");
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(`ошибка при запросе: ${err.message}`);
  }
};

export const postOrder = async (ingredients, thunkAPI) => {
  try {
    const data = await request("orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredients),
    });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(`ошибка при отправке: ${err.message}`);
  }
};
