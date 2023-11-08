import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import styles from "./profile.module.css";

function ProfilePage() {
  const [value, setValue] = useState("test");

  const inputRef = useRef(null);
  return (
    <div className={`${styles.container}`}>
      <div className={styles.column}>
        <nav className = {styles.menu}>
        <a className={`${styles.link} text_type_main-medium`}>Профиль</a>
        <a className={`${styles.link} text_type_main-medium text_color_inactive`}>
          История заказов
        </a>
        <a className={`${styles.link} text_type_main-medium text_color_inactive`}>
          Выход
        </a>
        </nav>
        <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          icon={"EditIcon"}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"login"}
          error={false}
          icon={"EditIcon"}
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
          icon={"EditIcon"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
         
        />
      </div>
    </div>
  );
}

export default ProfilePage;
