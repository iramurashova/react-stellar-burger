import styles from "./profile.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { fetchLogout } from "../../utils/api";
import { FC, MouseEventHandler } from "react";
import { useAppDispatch } from "../../utils/hooks";

const ProfilePage: FC = () => {
  const setActive = ({ isActive }: { isActive: boolean }) => {
    return `${styles.link} text_type_main-medium ${
      isActive ? "text_color_primary" : "text_color_inactive"
    }`;
  };
  const dispatch = useAppDispatch();
  const logout: MouseEventHandler = (e) => {
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
          <NavLink className={setActive} to="orders" end>
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
};

export default ProfilePage;
