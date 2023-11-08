import React, { useRef, useState } from "react";
import styles from "./resetPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPasswordPage() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={`text text_type_main-medium text_color_primary`}>
          Восстановление пароля
        </h2>

        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
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
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"code"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />

        <Button htmlType="button" type="primary" size="medium">
          Сохранить
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

export default ResetPasswordPage;
