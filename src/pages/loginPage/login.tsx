import React, { FC } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../utils/api";
const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(fetchLogin(values));
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={`text text_type_main-medium text_color_primary`}>
          Вход
        </h1>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          autoComplete="email"
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          autoComplete="current-password"
        />

        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={`text text_type_main-default text_color_accent ${styles.button}`}
        >
          Зарегистрироваться
        </Link>
        <p className={`text text_type_main-default text_color_inactive`}>
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`text text_type_main-default text_color_accent ${styles.button}`}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
