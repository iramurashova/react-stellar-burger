// system
import React, { useRef, useState } from "react";
import { useAppSelector } from "../../utils/hooks";
import { TIngredient, TVoidWithoutParams } from "../../utils/types";
//redux
import { selectIngredients } from "../../services/reducers/dataReducer/selector";

// components
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import Tabs from "./tabs/tabs";

// styles
import styles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  const ingredients = useAppSelector(selectIngredients);
  const oneRef = useRef<HTMLHeadingElement>(null);
  const twoRef = useRef<HTMLHeadingElement>(null);
  const threeRef = useRef<HTMLHeadingElement>(null);

  const handleScroll: TVoidWithoutParams = () => {
    const result = [
      {
        name: "one",
        coords: oneRef.current?.getBoundingClientRect().top,
      },
      {
        name: "two",
        coords: twoRef.current?.getBoundingClientRect().top,
      },
      {
        name: "three",
        coords: threeRef.current?.getBoundingClientRect().top,
      },
    ]
      .filter((el) => el.coords && el.coords > 0)
      .sort((a, b) => Number(a.coords) - Number(b.coords));

    if (result.length) {
      setCurrent(result[0].name);
    }
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>

        <Tabs current={current} setCurrent={setCurrent} />
        <article
          className={`${styles.ingredients_list} mt-10`}
          onScroll={handleScroll}
        >
          <h3 className="text text_type_main-medium  pb-6" ref={oneRef}>
            Булки
          </h3>
          <div className={`${styles.ingredients} pl-4`}>
            {ingredients.map((ingredient: TIngredient) => {
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
          <div className={`${styles.ingredients} pl-4`}>
            {ingredients.map((ingredient: TIngredient) => {
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
          <div className={`${styles.ingredients} pl-4`}>
            {ingredients.map((ingredient: TIngredient) => {
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
    </>
  );
}

export default BurgerIngredients;
