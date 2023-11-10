import {
  Button,
  EditIcon,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../services/reducers/userReducer/selector";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { fetchUpdateUser } from "../../../utils/api";


function MainPage() {
  const { name, email } = useSelector(selectUser);
  const [isEdit, setIsEdit] = useState(false);
  const [fieldDisabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [values, setValues] = useLocalStorage("userData", {
    name: "",
    email: "",
    password: "",
  });

  const onIconClick = () => {
        setDisabled(false);
        console.log('hi');
        setTimeout(() => inputRef.current?.focus(), 0);
    }
const onBlur = () => {
  setDisabled(true)
}

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  const handleSubmit = (e) => {
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
        
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
      />

      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        icon ={"EditIcon"}
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
}

export default MainPage;
