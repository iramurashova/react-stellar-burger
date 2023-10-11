// system
import React, { useState, useEffect } from "react";

// constants
import { domenAdress } from "../../utils/constants";

// components
import AppHeader from "./app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetais from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

// styles
import styles from "./app.module.css";

function App() {
  const order = {
    _id: "034536",
    status: "Ваш заказ начали готовить",
    message: "Дождитесь готовности на орбитальной станции",
  };
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [ingredientDetails, setIngredientDetais] = useState({
    isOpened: false,
    ingredient: null,
  });

  function closeModal() {
    setOrderDetails(false);
    setIngredientDetais({ isOpened: false, ingredient: null });
  }
  function handleEscape(e) {
    e.key === "Escape" && closeModal();
  }

  function getData() {
    setIsLoading(true);
    fetch(domenAdress)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setData(data))
      .catch((err) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => getData(), []);
  function getIngredientData({ ingredient }) {
    setIngredientDetais({ isOpened: true, ingredient: ingredient });
  }
  return (
    <>
      <AppHeader />
      <main className={`pb-10 ${styles.main}`}>
        {isLoading && <p className="text text_type_main-large">Загрузка...</p>}
        {hasError && (
          <p className="text text_type_main-large">Произошла ошибка</p>
        )}
        {data.success && data.data.length && (
          <BurgerIngredients
            ingredients={data.data}
            getIngredientData={getIngredientData}
          />
        )}
        {data.success && data.data.length && (
          <BurgerConstructor
            ingredients={data.data}
            onOpen={() => setOrderDetails(true)}
          />
        )}
      </main>
      {ingredientDetails.isOpened && (
        <Modal
          title="Детали ингредиента"
          onClose={closeModal}
          handleEscape={handleEscape}
        >
          <IngredientDetais ingredient={ingredientDetails.ingredient} />
        </Modal>
      )}
      {orderDetails && (
        <Modal title="" onClose={closeModal} handleEscape={handleEscape}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
}

export default App;
