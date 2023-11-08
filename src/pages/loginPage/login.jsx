import React, { useRef, useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
function LoginPage() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Вход
        </h2>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"login"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />

        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"password"}
          icon={"ShowIcon"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Button htmlType="button" type="primary" size="medium">
          Войти
        </Button>
      </div>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?
        </p>
        <a className={`text text_type_main-default text_color_accent`}>
          Зарегистрироваться
        </a>
        <p className={`text text_type_main-default text_color_inactive`}>
          Забыли пароль?
        </p>
        <a className={`text text_type_main-default text_color_accent`}>
          Восстановить пароль
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
