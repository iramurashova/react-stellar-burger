import React from "react";
import styles from './tabs.module.css'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function Tabs({ current }) {
  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === "one"}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
