import { RootStore } from "../../store";

export const selectOrderNumber = (store:RootStore) => store.orderDetails.order.number;
export const selectSuccess = (store:RootStore) => store.orderDetails.success;
export const selectOrderIsError = (store:RootStore) => store.orderDetails.isError;
export const selectOrderisLoading = (store:RootStore) => store.orderDetails.isLoading;
