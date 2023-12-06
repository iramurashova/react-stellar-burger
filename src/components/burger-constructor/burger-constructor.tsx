// system
import React, { FC, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//redux

import {
  selectModalOpen,
  selectTypeOfModal,
} from "../../services/reducers/modalReducer/selector";
import {
  closeModal,
  openModal,
} from "../../services/reducers/modalReducer/modalReducer";
import {
  selectBurgerBun,
  selectBurgerIngredients,
} from "../../services/reducers/burgerConstructorReducer/selector";

import {
  addIngredient,
  removeAllIngredients,
} from "../../services/reducers/burgerConstructorReducer/burgerConstructorReducer";

import { getOrderDetails } from "../../services/reducers/orderReducer/orderReducer";
import {
  selectOrderIsError,
  selectOrderisLoading,
  selectSuccess,
} from "../../services/reducers/orderReducer/selector";

// components
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";

// styles
import styles from "./burger-constructor.module.css";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../services/reducers/userReducer/selector";
import { TIngredient, TIngredientWithId } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";


const BurgerConstructor:FC = () => {
  const isOpen = useAppSelector(selectModalOpen);
  const ingredients = useAppSelector(selectBurgerIngredients);
  const bun = useAppSelector(selectBurgerBun);
  const allIngredients = bun?[...ingredients, bun] : ingredients ;
  const isLoading = useAppSelector(selectOrderisLoading);
  const isError = useAppSelector(selectOrderIsError)  as boolean;
  const success = useAppSelector(selectSuccess)  as boolean;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const onOpen = () => {
    if (user) {
      dispatch(
        getOrderDetails({
          ingredients: allIngredients.map((item) => item && item._id),
        })
      );
      !isError && dispatch(removeAllIngredients());
      dispatch(openModal("order"));
    } else {
      navigate("/login");
    }
  };
  const onClose = () => {
    dispatch(closeModal());
  };
  const typeOfModal = useAppSelector(selectTypeOfModal);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredient: TIngredient) => {
      const newElement:TIngredientWithId = { ...ingredient, _customId: uuidv4() };
      dispatch(addIngredient(newElement));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const amount = useMemo(() => {
    const sumIngredients:number = ingredients.reduce(
      (currentSum:number, currentIngredient:TIngredient) => {
        return currentSum + currentIngredient.price;
      },
      0
    );
    if (bun) {
      return sumIngredients + bun.price * 2;
    }
    return sumIngredients;
  }, [ingredients, bun]);
  return (
    <>
      <section
        className={`${styles.section} mt-15 pl-4 ${
          isHover ? styles.section_empty : ""
        } `}
        ref={dropTarget}
      >
        <ul className={styles.list}>
          {bun && (
            <li className={`${styles.item} pl-8 pr-4`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} верх`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
          {ingredients.length > 0 && (
            <ul className={`${styles.middle_list} pr-2`}>
              {ingredients.map((ingredient, index:number) => (
                <BurgerConstructorItem
                  key={ingredient._customId}
                  ingredient={ingredient}
                  index={index}
                />
              ))}
            </ul>
          )}

          {bun && (
            <li className={`${styles.item} pl-8 pr-4`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} низ`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
        </ul>
        {(bun || ingredients.length > 0) && (
          <div className={styles.summary}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{amount}</p>

              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={onOpen}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
      {isOpen && typeOfModal === "order" && (
        <Modal title="" handleClose={onClose}>
          {isLoading && (
            <p className="text text_type_main-medium  mb-15">Загрузка...</p>
          )}
          {isError && (
            <p className="text text_type_main-medium  mb-15">
              Произошла ошибка
            </p>
          )}
          {success && <OrderDetails />}
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
