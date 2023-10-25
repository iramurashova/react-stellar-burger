// system
import React, { createRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { selectIngredients } from "../../services/reducers/dataReducer/selector";
import {
  selectModalOpen,
  selectTypeOfModal,
} from "../../services/reducers/modalReducer/selector";

// components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import Modal from "../modal/modal";
import IngredientDetais from "../ingredient-details/ingredient-details";

// styles
import styles from "./burger-ingredients.module.css";


function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  const ingredients = useSelector(selectIngredients);
  const isOpen = useSelector(selectModalOpen);
  const typeOfModal = useSelector(selectTypeOfModal);
  const oneRef = createRef(null);
  const twoRef = createRef(null);
  const threeRef = createRef(null);

  const handleScroll = () => {
    const result = [
      {
        name: "one",
        coords: oneRef.current.getBoundingClientRect().top,
      },
      {
        name: "two",
        coords: twoRef.current.getBoundingClientRect().top,
      },
      {
        name: "three",
        coords: threeRef.current.getBoundingClientRect().top,
      },
    ]
      .filter((el) => el.coords > 0)
      .sort((a, b) => a.coords - b.coords);

    if (result.length) {
      setCurrent(result[0].name);
    }
  };

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
        <article
          className={`${styles.ingredients} mt-10`}
          onScroll={handleScroll}
        >
          <h3 className="text text_type_main-medium  pb-6" ref={oneRef}>
            Булки
          </h3>
          <div className={`${styles.burger_ingredients} pl-4`}>
            {ingredients.map((ingredient) => {
              if (ingredient.type === "bun") {
                return (
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredient={ingredient}
                  />
                );
              }
            })}
          </div>
          <h3 className="text_type_main-medium pt-10 pb-6" ref={twoRef}>
            Соусы
          </h3>
          <div className={`${styles.burger_ingredients} pl-4`}>
            {ingredients.map((ingredient) => {
              if (ingredient.type === "sauce") {
                return (
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredient={ingredient}
                  />
                );
              }
            })}
          </div>

          <h3 className="text_type_main-medium pt-10 pb-6" ref={threeRef}>
            Начинки
          </h3>
          <div className={`${styles.burger_ingredients} pl-4`}>
            {ingredients.map((ingredient) => {
              if (ingredient.type === "main") {
                return (
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredient={ingredient}
                  />
                );
              }
            })}
          </div>
        </article>
      </section>
      {isOpen && typeOfModal === "ingredient" && (
        <Modal title="Детали ингредиента">
          <IngredientDetais />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredients;
