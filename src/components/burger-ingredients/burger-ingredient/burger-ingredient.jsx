// system
import React from "react";
import PropTypes from "prop-types";

// components
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./burger-ingredient.module.css";

// utils
import { ingredientPropType } from "../../../utils/prop-types";

function BurgerIngredient({ ingredient, count, getIngredientData }) {
  return (
    <div
      className={styles.burger_ingredient}
      key={ingredient._id}
      onClick={() => getIngredientData({ ingredient })}
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
      {count && (
        <Counter
          count={ingredient.count}
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
  count: PropTypes.number,
  getIngredientData: PropTypes.func.isRequired,
};

export default BurgerIngredient;
