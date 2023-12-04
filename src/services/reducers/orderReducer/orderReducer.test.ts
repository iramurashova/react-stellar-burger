import { fakeNumberOrder } from "../../../utils/data";
import { initialOrderState, orderReducer } from "./orderReducer";

describe("Testing modalSlice", () => {
  test("Return initialState", () => {
    expect(orderReducer(undefined, { type: undefined })).toEqual(
      initialOrderState
    );
  });
  test("Order post is loading", () => {
    expect(orderReducer(initialOrderState, { type: "order/post/pending"  })).toEqual(
     {... initialOrderState,
    isLoading: true}
    );
  });
  test("Order post loading success", () => {
    expect(orderReducer(initialOrderState, { type: "order/post/fulfilled", payload: fakeNumberOrder  })).toEqual(
     {... initialOrderState,
        success: fakeNumberOrder.success,
    order: fakeNumberOrder.order}
    );
  });
  test("Order post loading error", () => {
    expect(orderReducer(initialOrderState, { type: "order/post/rejected"  })).toEqual(
     {... initialOrderState,
    isError: true}
    );
  });
});
