import {
  Button,
  EditIcon,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./main.module.css";
import { selectUser } from "../../../services/reducers/userReducer/selector";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { fetchUpdateUser } from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const MainPage: FC = () => {
  const { name, email } = useAppSelector(selectUser)
  const [isEdit, setIsEdit] = useState(false);
  const [fieldDisabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useLocalStorage("userData", {
    name: "",
    email: "",
    password: "",
  });

  const onIconClick = (event?: React.MouseEvent<HTMLDivElement>) => {
    const target = event?.currentTarget
      .closest(".input")
      ?.querySelector("input") as HTMLDivElement;
    target.removeAttribute("readonly");
    target.focus();
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e?.currentTarget
      .closest(".input")
      ?.querySelector("input") as HTMLInputElement;
    target.setAttribute("readonly", "true");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as typeof e.target & {
      [name: string]: string;
    };
    setValues({ ...values, [target.name]: target.value });
    setIsEdit(true);
  };

  const handleReset = () => {
    setIsEdit(false);
    if (name && email) {
      setValues({
        name,
        email,
        password: "",
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsEdit(false);
    dispatch(fetchUpdateUser(values));
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
        password: "",
      });
    }
  }, [name, email]);

  return (
    <form onSubmit={handleSubmit} className={styles.inputs}>
      <Input
        placeholder={"Имя"}
        onChange={handleChange}
        name={"name"}
        value={values.name}
        icon={"EditIcon"}
        size={"default"}
        disabled={fieldDisabled}
        onIconClick={onIconClick}
        onBlur={onBlur}
        autoComplete="username"
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        autoComplete="email"
      />

      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        icon={"EditIcon"}
        autoComplete="new-password"
      />

      {isEdit && (
        <div className={styles.footer}>
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            onClick={handleReset}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default MainPage;
