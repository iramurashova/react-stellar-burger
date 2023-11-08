import React, { useRef, useState } from "react";
import styles from "./forgotPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPasswordPage() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Восстановление пароля
        </h2>

        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"login"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />

        <Button htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <div className={styles.summary}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
        </p>
        <a className={`text text_type_main-default text_color_accent`}>Войти</a>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
