import { NavLink, useMatch } from "react-router-dom";
import styles from "./menu-item.module.css";
import PropTypes from "prop-types";

function MenuItem({ icon, text, path }) {

  const setActive = ({ isActive }) => {
    return `${styles.menu_link} ${isActive ? "text_color_primary" : "text_color_inactive"}`;
  };
  return (
    <li className={`${styles.menu_item} pt-4 pb-4 pl-5 pr-5`}>
      <NavLink to={path} className={setActive}>
        {icon}
        <p
          className={`text text_type_main-default`}
        >
          {text}
        </p>
      </NavLink>
    </li>
  );
}
MenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  textType: PropTypes.string,
};
export default MenuItem;
