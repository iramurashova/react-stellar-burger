import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuthChecked,
  setUser,
} from "../services/reducers/userReducer/userReducer";
import { domenAdress } from "./constants";
import { deleteCookie, getCookie, setCookie } from "./cookie";
import { IValues,  TOrders } from "./types";
import { AppDispatch } from "../services/store";
type TRequestOptions = RequestInit & {
  headers: Record<string, string>;
};
type TIngredients = {
  ingredients: string[];
};

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (endPoints: string, options: TRequestOptions) => {
  return fetch(`${domenAdress}/${endPoints}`, options).then(checkResponse);
};

export const fetchIngredients = async () => {
  return request("ingredients", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((res) => res.data);
};

export const postOrder = async (ingredients: TIngredients) => {
  return request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken") as string,
    },
    body: JSON.stringify(ingredients),
  });
};
const refreshToken = () => {
  return fetch(`${domenAdress}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url: string, options: TRequestOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    console.log(err);
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      console.log(refreshData);
 
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken; 
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchGetUser = () => {
  return async (dispatch: AppDispatch) => {
    const res = await fetchWithRefresh(`${domenAdress}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken") as string,
      },
    });
    if (res.success) {
      dispatch(setUser(res.user));
    } else {
      return Promise.reject("Ошибка данных с сервера");
    }
  };
};

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (values: IValues) => {
    const res = await request("auth/register", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
      }),
    });
    setCookie("accessToken", res.accessToken);
    setCookie("refreshToken", res.refreshToken);
    return res.user;
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (values: IValues) => {
    const res = await request("auth/login", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    setCookie("accessToken", res.accessToken);
    setCookie("refreshToken", res.refreshToken);
    return res.user;
  }
);
export const fetchLogout = createAsyncThunk("auth/logout", async () => {
  await request("auth/logout", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
});

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (getCookie("accessToken")) {
      dispatch(fetchGetUser())
        .catch(() => {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const fetchUpdateUser = createAsyncThunk(
  "auth/updateUser",
  async (values: IValues) => {
    const token = getCookie("accessToken");
    const res = await fetchWithRefresh(`${domenAdress}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: token as string,
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
      }),
    });
    return res.user;
  }
);

export const fetchForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (values: IValues) => {
    return request("password-reset", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: values.email,
      }),
    });
  }
);
export const fetchResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (values: IValues) => {
    return request("password-reset/reset", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        password: values.password,
        token: values.token,
      }),
    });
  }
);
export const fetchOrders = createAsyncThunk(
  "data/fetchOrders",
  async function (number: string) {
  const res = await request(`orders/${number}`, {
  method: "GET",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
  "Content-Type": "application/json;charset=utf-8",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  });
  const data: TOrders = await res;

return data;
}
);






