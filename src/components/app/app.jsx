// system
import React, { useState, useEffect } from "react";

// utils
import request from "../../utils/api";

// components
import AppHeader from "./app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

// styles
import styles from "./app.module.css";

function App() {
 
  const [apiData, setApiData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getApiData() {
    setIsLoading(true);
   request()
      .then((data) => setApiData(data))
      .catch((err) => {
        setHasError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => getApiData(), []);

  return (
    <>
      <AppHeader />
      <main className={`pb-10 ${styles.main}`}>
        {isLoading && <p className="text text_type_main-large">Загрузка...</p>}
        {hasError && (
          <p className="text text_type_main-large">Произошла ошибка</p>
        )}
        {apiData.success && apiData.data.length && (
          <BurgerIngredients
            ingredients={apiData.data}
          />
        )}
        {apiData.success && apiData.data.length && (
          <BurgerConstructor
            ingredients={apiData.data}
            
          />
        )}
      </main>
     
     
    </>
  );
}

export default App;
