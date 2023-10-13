import React, { useState } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import MenuItem from "./menu-item/menu-item";

function AppHeader() {
  const [current, setCurrent] = useState("one");
  return (
    <header className={`m-10 pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <MenuItem
            value="one"
            icon={
              <BurgerIcon type={current === "one" ? "primary" : "secondary"} />
            }
            text="Конструктор"
            textType="text_color_active"
          />

          <MenuItem
            value="two"
            icon={
              <ListIcon type={current === "two" ? "primary" : "secondary"} />
            }
            text="Лента заказов"
          />
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>

        <MenuItem
          value="three"
          icon={
            <ProfileIcon type={current === "three" ? "primary" : "secondary"} />
          }
          text="Личный кабинет"
        />
      </nav>
    </header>
  );
}

export default AppHeader;
