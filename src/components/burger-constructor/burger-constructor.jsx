// system
import React, { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//redux

import {
  selectModalOpen,
  selectTypeOfModal,
} from "../../services/reducers/modalReducer/selector";
import { openModal } from "../../services/reducers/modalReducer/modalReducer";
import {
  selectBurgerBun,
  selectBurgerIngredients,
} from "../../services/reducers/burgerConstructorReducer/selector";

import { addIngredient, removeAllIngredients } from "../../services/reducers/burgerConstructorReducer/burgerConstructorReducer";

import { postOrderDetails } from "../../services/reducers/orderReducer/orderReducer";
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

function BurgerConstructor() {
  const isOpen = useSelector(selectModalOpen);
  const ingredients = useSelector(selectBurgerIngredients);
  const bun = useSelector(selectBurgerBun);
  const allIngredients = [...ingredients, bun];
  const isLoading = useSelector(selectOrderisLoading);
  const isError = useSelector(selectOrderIsError);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();
  const onOpen = () => {
    dispatch(
      postOrderDetails({
        ingredients: allIngredients.map((item) => item._id),
      })
    );
    dispatch(openModal("order"));
    dispatch(removeAllIngredients());
  };
  const typeOfModal = useSelector(selectTypeOfModal);
 
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      const newElement = { ...ingredient, _customId: uuidv4() };
      dispatch(addIngredient(newElement));
    },
  });
  const amount = useMemo(() => {
    const sumIngredients = ingredients.reduce(
      (currentSum, currentIngredient) => {
        return currentSum + currentIngredient.price;
      },
      0
    );
    if (bun) {
      return sumIngredients + bun?.price * 2;
    }
    return sumIngredients;
  }, [ingredients, bun]);
  return (
    <>
      <section className={`mt-15 pl-4  ${styles.section}`} ref={dropTarget}>
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
          <ul className={`${styles.middle_list} pr-2`}>
            {ingredients.map((ingredient, index) => (
              <BurgerConstructorItem
                key={ingredient._customId}
                ingredient={ingredient}
                index={index}
              />
            ))}
          </ul>

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
        <Modal title="">
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
}

export default BurgerConstructor;
