// system
import React, { FC, useEffect } from "react";
import {Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsData } from "../../services/reducers/dataReducer/dataReducer";

// components
import AppHeader from '../app/app-header/app-header'



// styles
import styles from "./layout.module.css";

//redux
import {
  selectIngredientsIsError,
  selectIngredientsIsLoading,
} from "../../services/reducers/dataReducer/selector";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const Layout:FC = () => {
    const isLoading = useAppSelector(selectIngredientsIsLoading);
    const isError = useAppSelector(selectIngredientsIsError);
  
    const dispatch = useAppDispatch();
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
       <Outlet/>  
          </main>
        </>
      );
    }
}

export default Layout