import {
  dataReducer,
  getIngredientData,
  initialDataState,
  removeIngredientData,
  setWebsocketClose,
  setWebsocketConnection,
  setWebsocketConnectionError,
  setWebsocketGetOrders,
  setWebsocketOffline,
  setWebsocketOpen,
} from "./dataReducer";
import { ingredientsArray, fakeWsMessage, fakeBun } from "../../../utils/data";
describe("Testing dataSlice", () => {
  test("Return initialState", () => {
    expect(dataReducer(undefined, { type: undefined })).toEqual(
      initialDataState
    );
  });
  test("Loading ingredients process", () => {
    expect(
      dataReducer(initialDataState, {
        type: "data/ingredients/get/pending",
      })
    ).toEqual({
      ...initialDataState,
      ingredientsIsLoading: true,
    });
    expect(
      dataReducer(undefined, {
        type: "data/ingredients/get/pending",
      })
    ).toEqual({
      ...initialDataState,
      ingredientsIsLoading: true,
    });
  });
  test("Loading ingredients success", () => {
    expect(
      dataReducer(initialDataState, {
        type: "data/ingredients/get/fulfilled",
        payload: ingredientsArray,
      })
    ).toEqual({
      ...initialDataState,
      ingredientsFromApi: ingredientsArray,
      ingredientsIsLoading: false,
    });
    expect(
      dataReducer(undefined, {
        type: "data/ingredients/get/fulfilled",
        payload: ingredientsArray,
      })
    ).toEqual({
      ...initialDataState,
      ingredientsFromApi: ingredientsArray,
      ingredientsIsLoading: false,
    });
  });
  test("Loading ingredients error", () => {
    expect(
      dataReducer(initialDataState, {
        type: "data/ingredients/get/rejected",
      })
    ).toEqual({
      ...initialDataState,
      ingredientsIsLoading: false,
      ingredientsIsError: true,
    });
    expect(
      dataReducer(undefined, {
        type: "data/ingredients/get/rejected",
      })
    ).toEqual({
      ...initialDataState,
      ingredientsIsLoading: false,
      ingredientsIsError: true,
    });
  });
  test("Get ingredient details", () => {
    expect(dataReducer(initialDataState, getIngredientData(fakeBun))).toEqual({
      ...initialDataState,
      ingredientDetails: {
        ingredient: fakeBun,
      },
    });
  });
  test("Remove ingredient details", () => {
    expect(dataReducer(initialDataState, removeIngredientData())).toEqual({
      ...initialDataState,
      ingredientDetails: {
        ingredient: null,
      },
    });
  });
  test("WS connection open", () => {
    expect(dataReducer(initialDataState, setWebsocketOpen(true))).toEqual({
      ...initialDataState,
      wsOpen: true,
      wsError: null,
    });
  });
  test("WS connecting", () => {
    expect(
      dataReducer(initialDataState, setWebsocketConnection("url"))
    ).toEqual({
      ...initialDataState,
      wsConnectionStatus: true,
      wsUrl: "url",
    });
  });

  test("WS connecting with error", () => {
    expect(
      dataReducer(initialDataState, setWebsocketConnectionError("Some error"))
    ).toEqual({
      ...initialDataState,
      wsError: "Some error",
    });
  });
  test("WS connecting offline", () => {
    expect(dataReducer(initialDataState, setWebsocketOffline())).toEqual({
      ...initialDataState,
      wsConnectionStatus: false,
    });
  });

  test("WS connection close", () => {
    expect(dataReducer(initialDataState, setWebsocketClose())).toEqual({
      ...initialDataState,
      wsOpen: false,
      wsUrl: "",
      wsError: null,
      orders: null,
    });
  });
  test("WS get orders", () => {
    expect(
      dataReducer(initialDataState, setWebsocketGetOrders(fakeWsMessage))
    ).toEqual({
      ...initialDataState,
      orders: fakeWsMessage,
    });
  });
  test("Loading orders from server success", () => {
    expect(
      dataReducer(initialDataState, {
        type: "data/fetchOrders/fulfilled",
        payload: fakeWsMessage,
      })
    ).toEqual({
      ...initialDataState,
      orders: fakeWsMessage,
    });
  });
});
