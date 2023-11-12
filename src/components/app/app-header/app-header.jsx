import React, { useState } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import MenuItem from "./menu-item/menu-item";
import { Link, NavLink, useLocation, useMatch } from "react-router-dom";

function AppHeader() {
  const {pathname} = useLocation();
  return (
    <header className={`m-10 pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <MenuItem
            value="one"
            text="Конструктор"
            path="/"
            icon={<BurgerIcon type={pathname==='/' ? 'primary': 'secondary'}/>}
          />

          <MenuItem
            value="two"
            icon={<ListIcon type={pathname==='/orders' ? 'primary': 'secondary'}/>}
            text="Лента заказов"
            path="/orders"
          />
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>

        <MenuItem
          value="three"
          icon={<ProfileIcon type={pathname==='/profile' ? 'primary': 'secondary'}/>}
          text="Личный кабинет"
          path="/profile"
        />
      </nav>
    </header>
  );
}

export default AppHeader;
