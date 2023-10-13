// system
import React, {useState} from "react";
import PropTypes from "prop-types";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import Modal from "../modal/modal";
import IngredientDetais from "../ingredient-details/ingredient-details";

// styles
import styles from "./burger-ingredients.module.css";

// utils
import { ingredientPropType } from "../../utils/prop-types";


function BurgerIngredients({ ingredients}) {
  const [current, setCurrent] = React.useState("one");
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  function closeModal() {
    setIngredientDetails({ isOpened: false, ingredient: null });
  }

  function getIngredientData({ ingredient }) {
    setIngredientDetails({ isOpened: true, ingredient: ingredient });
  }
  return (
    <>
    <section className={styles.burger_ingredients_container}>
      <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>

      <div className={styles.tabs}>
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
     {ingredientDetails.isOpened && (
      <Modal
        title="Детали ингредиента"
        onClose={closeModal}
      >
        <IngredientDetais ingredient={ingredientDetails.ingredient} />
      </Modal>
     
    )}
     </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
export default BurgerIngredients;
