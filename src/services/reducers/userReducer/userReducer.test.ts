import { fakeUser } from "../../../utils/data";
import { TUser, setAuthChecked, setEmailChecked, setUser } from "./userReducer";
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
  test("User registration error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/register/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, isAuthChecked: true, error: "error one" });
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
  test("User reset password success", () => {
    expect(
      userReducer(initialUserState, {
        type: "auth/resetPassword/fulfilled",
      })
    ).toEqual(initialUserState);
  });
  test("User reset password error", () => {
    const error = "error one";
    expect(
      userReducer(initialUserState, {
        type: "auth/resetPassword/rejected",
        payload: error,
      })
    ).toEqual({ ...initialUserState, error: "error one" });
  });
  test ("Set user", () => {
    expect(userReducer(initialUserState, setUser(fakeUser.user))).toEqual({
      ...initialUserState, user: fakeUser.user
    })
  })
  test ("Set auth checked", () => {
    expect(userReducer(initialUserState, setAuthChecked(true))).toEqual({
      ...initialUserState, isAuthChecked: true
    })
  })
  test ("Set email checked", () => {
    expect(userReducer(initialUserState, setEmailChecked(true))).toEqual({
      ...initialUserState, isEmailChecked: true
    })
  })
});
