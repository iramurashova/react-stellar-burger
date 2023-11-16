import React, { FC, useRef, useState } from "react";
import styles from "./forgotPassword.module.css";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { fetchForgotPassword } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setEmailChecked } from "../../services/reducers/userReducer/userReducer";

const ForgotPasswordPage: FC = () => {
  const { values, handleChange } = useForm({ email: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(fetchForgotPassword(values)).then((res) =>
      dispatch(setEmailChecked(res.payload.success))
    );
    navigate("/reset-password");
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Восстановление пароля
        </h2>

        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          placeholder="Укажите e-mail"
          autoComplete="email"
        />

        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
        </p>
        <Link
          to="/login"
          className={`text text_type_main-default text_color_accent ${styles.button}`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
