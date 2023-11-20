import { NavLink } from "react-router-dom";
import styles from "./menu-item.module.css";
import { FC } from "react";
type TMenuItemProps = {
  icon: React.ReactNode;
  text: string;
  path: string;
};
const MenuItem: FC<TMenuItemProps> = ({ icon, text, path }) => {
  const setActive = ({ isActive }: { isActive: boolean }): string => {
    return `${styles.menu_link} ${
      isActive ? "text_color_primary" : "text_color_inactive"
    }`;
  };
  return (
    <li className={`${styles.menu_item} pt-4 pb-4 pl-5 pr-5`}>
      <NavLink to={path} className={setActive}>
        {icon}
        <p className={`text text_type_main-default`}>{text}</p>
      </NavLink>
    </li>
  );
};

export default MenuItem;
