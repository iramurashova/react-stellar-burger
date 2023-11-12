import React from "react";
import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function IngredientPage() {
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large mt-25`}>
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </section>
  );
}

export default IngredientPage;
