// system
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsData } from "../../services/reducers/dataReducer/dataReducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// components
import AppHeader from "./app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

// styles
import styles from "./app.module.css";

//redux
import { selectIsError, selectIsLoading } from "../../services/reducers/dataReducer/selector";



function App() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsData());
  }, []);


  if (isError) {
    return <p className="text text_type_main-large">Произошла ошибка</p>;
  } else if (isLoading) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  } else {
    return (
      <>
        <AppHeader />
        <main className={`pb-10 ${styles.main}`}>
          <DndProvider backend ={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
          </DndProvider>
         
        </main>
      </>
    );
  }
}

export default App;
