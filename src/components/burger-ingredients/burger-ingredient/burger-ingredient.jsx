// system
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

// components
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./burger-ingredient.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";

//redux
import { getIngredientData } from "../../../services/reducers/dataReducer/dataReducer";
import { openModal } from "../../../services/reducers/modalReducer/modalReducer";

function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();
  const allIngredients = useSelector((store) => {
    const ingredients = store.burgerConstructor.ingredients;
    const bun = store.burgerConstructor.bun;
    return [...ingredients, bun];
  });

  const onOpen = () => {
    dispatch(getIngredientData(ingredient));
    dispatch(openModal("ingredient"));
  };
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  const count = useMemo(() => {
    if (allIngredients.length) {
      return (
        allIngredients.filter((el) => el?._id === ingredient._id).length || 0
      );
    }
  }, [allIngredients]);

  return (
    <div
      className={styles.burger_ingredient}
      key={ingredient._id}
      onClick={onOpen}
      ref={dragRef}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      <div className={styles.price}>
        <p className={`text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`text text_type_main-default ${styles.name}`}>
        {ingredient.name}
      </h4>
      {count > 0 && (
        <Counter
          count={count}
          size="default"
          extraClass="m-1"
          className={styles.counter}
        />
      )}
    </div>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default BurgerIngredient;
