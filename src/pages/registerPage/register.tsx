import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useState } from "react";
import styles from "./register.module.css";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { fetchRegister } from "../../utils/api";
import { useAppDispatch } from "../../utils/hooks";

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const validateName = (name: string) => {
    if (name.length < 2) {
      return false;
    }
    return true;
  };
  const validateField = (value: string) => {
    setError(!validateName(value));
  };
  const onFocus = () => {
    setError(false);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
  };
  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegister(values));
    setValues({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h1 className={`text text_type_main-medium text_color_primary`}>
          Регистрация
        </h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          size={"default"}
          autoComplete="username"
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          errorText="Ой, произошла ошибка!"
        />
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
          autoComplete="new-password"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?
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

export default RegisterPage;
