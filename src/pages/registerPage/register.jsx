import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import styles from "./register.module.css";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../utils/api";

function RegisterPage() {
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(fetchRegister(values));
    setValues({
        name: '',
        email: '',
        password: ''
    })
}
  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Регистрация
        </h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          size={"default"}
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?
        </p>
        <Link to = '/login'>
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

export default RegisterPage;


// accessToken
// : 
// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGNiNmY0YzJjYzYxMDAxYjNkNjlmYSIsImlhdCI6MTY5OTUyNjM4OCwiZXhwIjoxNjk5NTI3NTg4fQ.Ys-ctyVYaC5SP4xl6ffVgnzWJqoAJUKs89EGWT-gn28"
// refreshToken
// : 
// "0c51fdef71604436bc598ba5bb1292f41e46b851abbe52e3aa345f701ce16b07b57c2feb5375bf5d"
 
