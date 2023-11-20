import React, { FC } from "react";
import styles from './tabs.module.css'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
type TTabsProps = {
  current: string,
  setCurrent: React.Dispatch<React.SetStateAction<string>>
}

const Tabs:FC<TTabsProps> = ({ current, setCurrent }) => {
  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
