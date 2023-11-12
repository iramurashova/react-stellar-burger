import { useDispatch } from "react-redux";
import styles from "./profile.module.css";
import { Link, NavLink, Outlet, useMatch } from "react-router-dom";
import { fetchLogout } from "../../utils/api";

function ProfilePage() {

  const setActive = ({isActive}) => {
    return `${styles.link} text_type_main-medium ${
      isActive ? "text_color_primary" : "text_color_inactive"
    }`;
  };
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(fetchLogout());
};

  return (
    <div className={`${styles.container}`}>
      <div className={styles.column}>
        <nav className={styles.menu}>
          <NavLink className={setActive} to="/profile" end>
            Профиль
          </NavLink>
          <NavLink className={setActive} to="orders" end >
            История заказов
          </NavLink>
          <NavLink className={setActive} to="/" onClick={logout} end>
            Выход
          </NavLink>
        </nav>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.description}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfilePage;
