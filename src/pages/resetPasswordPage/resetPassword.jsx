import React, { useRef, useState } from "react";
import styles from "./resetPassword.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchResetPassword } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { selectEmailChecked } from "../../services/reducers/userReducer/selector";

function ResetPasswordPage() {
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });
  const isEmailChecked = useSelector(selectEmailChecked)
  console.log(isEmailChecked);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchResetPassword(values));
    {navigate('/')}
  };
  if (!isEmailChecked) {
    return <Navigate to="/forgot-password" />;
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Восстановление пароля
        </h2>

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.token}
          name={"token"}
          size={"default"}
        />

        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
        </p>
        <Link>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
          >
            Войти
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
