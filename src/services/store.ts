import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/dataReducer/dataReducer";
import { modalReducer } from "./reducers/modalReducer/modalReducer";
import { burgerConstructorReducer } from "./reducers/burgerConstructorReducer/burgerConstructorReducer";
import { orderReducer } from "./reducers/orderReducer/orderReducer";
import { userReducer } from "./reducers/userReducer/userReducer";
import { socketMiddleware } from "./middleware/middleware";

const wsActions = {
wsConnection: "data/setWebsocketConnection",
wsOffline: "data/setWebsocketOffline",
wsOpen: "data/setWebsocketOpen",
wsError: "data/setWebsocketConnectionError",
wsMessage: "data/setWebsocketGetOrders",
wsClose: "data/setWebsocketClose",
};

const rootReducer = combineReducers({
data: dataReducer,
modal: modalReducer,
burgerConstructor: burgerConstructorReducer,
orderDetails: orderReducer,
user: userReducer,
});

export const store = configureStore({
reducer: rootReducer,
middleware: getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type RootStore = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
