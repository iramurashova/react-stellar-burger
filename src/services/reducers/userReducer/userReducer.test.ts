import { fakeUser } from "../../../utils/data";
import { TUser } from "./userReducer";
import { userReducer, initialUserState } from "./userReducer";
const error = { message: "error one" };

describe("Testing userSlice", () => {
  test("Return initialState", () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(
      initialUserState
    );
  });

  test("User registration success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/register/fulfilled",
        payload: fakeUser,
      })
    ).toEqual({ ...initialUserState, isAuthChecked: true, user: fakeUser });
  });
  test("User register error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/register/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
  test("User login success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/login/fulfilled",
        payload: fakeUser,
      })
    ).toEqual({ ...initialUserState, isAuthChecked: true, user: fakeUser });
  });
  test("User login error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/login/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
  test("User logout success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/logout/fulfilled",
      })
    ).toEqual({ ...initialUserState, isAuthChecked: false, user: null });
  });
  test("User logout error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/logout/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
  test("User update success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/updateUser/fulfilled",
        payload: fakeUser,
      })
    ).toEqual({ ...initialUserState, isAuthChecked: true, user: fakeUser });
  });
  test("User update error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/updateUser/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
  test("User forgot password success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/forgotPassword/fulfilled",
      })
    ).toEqual(initialUserState);
  });
  test("User forgot password error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/forgotPassword/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
  test("User forgot password success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/resetPassword/fulfilled",
      })
    ).toEqual(initialUserState);
  });
  test("User logout error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/resetPassword/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
});
