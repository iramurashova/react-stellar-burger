import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/dataReducer/dataReducer";
import { modalReducer } from "./reducers/modalReducer/modalReducer";
import { burgerConstructorReducer } from "./reducers/burgerConstructorReducer/burgerConstructorReducer";
import { orderReducer } from "./reducers/orderReducer/orderReducer";
export const store = configureStore({
  reducer: {
    ingredients: dataReducer,
    modal: modalReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderReducer,
  },
});
