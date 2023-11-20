import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/dataReducer/dataReducer";
import { modalReducer } from "./reducers/modalReducer/modalReducer";
import { burgerConstructorReducer } from "./reducers/burgerConstructorReducer/burgerConstructorReducer";
import { orderReducer } from "./reducers/orderReducer/orderReducer";
import { userReducer } from "./reducers/userReducer/userReducer";
export const store = configureStore({
  reducer: {
    ingredients: dataReducer,
    modal: modalReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderReducer,
    user: userReducer
  },
});

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch