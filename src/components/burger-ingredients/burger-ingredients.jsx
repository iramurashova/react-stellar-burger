import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

function BurgerIngredients({ ingredients, getIngredientData }) {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={styles.burger_ingredients_container}>
      <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>

      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <article className={`${styles.ingredients} mt-10`}>
        <h3 className="text text_type_main-medium  pb-6">Булки</h3>
        <div className={`${styles.burger_ingredients} pl-4`}>
          {ingredients.map((ingredient) => {
            if (ingredient.type === "bun") {
              return (
                <BurgerIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  getIngredientData={getIngredientData}
                />
              );
            }
          })}
        </div>
        <h3 className="text_type_main-medium pt-10 pb-6">Соусы</h3>
        <div className={`${styles.burger_ingredients} pl-4`}>
          {ingredients.map((ingredient) => {
            if (ingredient.type === "sauce") {
              return (
                <BurgerIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  getIngredientData={getIngredientData}
                />
              );
            }
          })}
        </div>
        <h3 className="text_type_main-medium pt-10 pb-6">Начинки</h3>
        <div className={`${styles.burger_ingredients} pl-4`}>
          {ingredients.map((ingredient) => {
            if (ingredient.type === "main") {
              return (
                <BurgerIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  getIngredientData={getIngredientData}
                />
              );
            }
          })}
        </div>
      </article>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  getIngredientData: PropTypes.func.isRequired,
};
export default BurgerIngredients;
