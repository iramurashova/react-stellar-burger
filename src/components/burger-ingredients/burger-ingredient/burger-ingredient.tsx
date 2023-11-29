// system
import React, { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";


// components
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./burger-ingredient.module.css";

//redux
import { getIngredientData } from "../../../services/reducers/dataReducer/dataReducer";
import { openModal } from "../../../services/reducers/modalReducer/modalReducer";
import { selectAllIngredients } from "../../../services/reducers/dataReducer/selector";

//types
import { TIngredient } from "../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

type TBurgerIngredientProps = {
  ingredient: TIngredient
}
const BurgerIngredient: FC<TBurgerIngredientProps>= ({ ingredient }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allIngredients = useAppSelector(selectAllIngredients);

  const onOpen = () => {
    dispatch(getIngredientData(ingredient));
    dispatch(openModal("ingredient"));
  };
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  const count= useMemo(() => {
    if (allIngredients.length) {
      return (
        allIngredients.filter((el) => el?._id === ingredient._id).length || 0
      );
    }
  }, [allIngredients]);

  return (
   
    <Link
    state = {{background: location}}
    to={`ingredients/${ingredient._id}`}
      className={`text_color_primary ${styles.burger_ingredient}`}
      key={ingredient._id}
      onClick={onOpen}
      ref={dragRef}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      <div className={styles.price}>
        <p className={`text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`text text_type_main-default ${styles.name}`}>
        {ingredient.name}
      </h4>
      { count as number >0 && (
        <div className={styles.counter}>
        <Counter
          count={count || 0}
          size="default"
          extraClass="m-1" 
        />
        </div>
      )}
    </Link>
  );
}

export default BurgerIngredient;
