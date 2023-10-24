export const selectOrderNumber = (store)=> store.orderDetails.order.number;
export const selectSuccess = (store)=> store.orderDetails.success;
export const selectOrderIsError = (store) => store.orderDetails.isError;
export const selectOrderisLoading = (store)=> store.orderDetails.isLoading;