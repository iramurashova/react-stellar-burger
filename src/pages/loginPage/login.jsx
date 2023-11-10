import React from "react";
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
function LoginPage() {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(values));
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Вход
        </h2>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          extraClass="ml-1"
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="ml-1"
        />

        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?
        </p>
        <Link to="/register">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
          >
            Зарегистрироваться
          </Button>
        </Link>
        <p className={`text text_type_main-default text_color_inactive`}>
          Забыли пароль?
        </p>
        <Link to="/forgot-password">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
          >
            Восстановить пароль
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;


//Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGNiNmY0YzJjYzYxMDAxYjNkNjlmYSIsImlhdCI6MTY5OTYwODg3OCwiZXhwIjoxNjk5NjEwMDc4fQ.MtdYpGeVqc7gGuq0ZtEX7iRXYhOBzLagE5ZKPJVL2r4