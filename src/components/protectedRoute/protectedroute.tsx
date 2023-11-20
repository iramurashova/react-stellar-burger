import { Navigate, useLocation } from "react-router-dom";
import React, { FC, useEffect } from "react";
import { setAuthChecked } from "../../services/reducers/userReducer/userReducer";
import { checkUserAuth } from "../../utils/api";
import { selectAuth, selectUser } from "../../services/reducers/userReducer/selector";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";


const ProtectedRoute = ({ onlyUnAuth = false, component}: {onlyUnAuth?:boolean, component: JSX.Element}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user
  return component;
};

export const OnlyAuth = ({component}: {component: JSX.Element}) => <ProtectedRoute onlyUnAuth={false} component={component} />;
export const OnlyUnAuth = ({component}: {component: JSX.Element}) => <ProtectedRoute onlyUnAuth={true} component={component} />;
