import styles from "./menu-item.module.css";
import PropTypes from "prop-types";

function MenuItem({ icon, text, textType }) {
  return (
    <li className={`${styles.menu_item} pt-4 pb-4 pl-5 pr-5`}>
      <a href="#" className={styles.menu_link}>
        {icon}
        <p
          className={`text text_type_main-default ${
            textType === "text_color_active"
              ? "text_color_primary"
              : "text_color_inactive"
          }`}
        >
          {text}
        </p>
      </a>
    </li>
  );
}
MenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  textType: PropTypes.string,
};
export default MenuItem;
