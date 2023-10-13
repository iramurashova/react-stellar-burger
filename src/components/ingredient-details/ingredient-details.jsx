// system
import React from "react";
import PropTypes from "prop-types";

// styles
import styles from "./ingredient-details.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";


function IngredientDetais({ ingredient }) {
  console.log({ ingredient });
  return (
    <>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={` ${styles.image} mb-4`}
      />
      <h3 className={`text text_type_main-medium mb-8`}>{ingredient.name}</h3>
      <ul className={`${styles.details} mb-15`}>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}

IngredientDetais.propTypes = {
  ingredient: ingredientPropType.isRequired,
};
export default IngredientDetais;
