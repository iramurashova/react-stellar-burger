//system
import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

//sty;es
import styles from "./burger-constructor-item.module.css";

//components
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

//redux
import { selectBurgerIngredients } from "../../../services/reducers/burgerConstructorReducer/selector";
import {
  changeIngredientsPlace,
  removeIngredient,
} from "../../../services/reducers/burgerConstructorReducer/burgerConstructorReducer";
import { TIngredientWithId } from "../../../utils/types";
type TBurgerConstructorItemprops = {
  ingredient: TIngredientWithId;
  index: number;
};


const BurgerConstructorItem: FC<TBurgerConstructorItemprops> = ({
  ingredient,
  index,
}) => {
  const dispatch = useDispatch();
  const burgerIngredientsArr = useSelector(selectBurgerIngredients) as Array<TIngredientWithId>;
  const findIndex = (el:TIngredientWithId) => burgerIngredientsArr.indexOf(el);
  const [, dragRef] = useDrag({
    type: "sort",
    item: { item: ingredient },
  });
  const [, dropRef] = useDrop({
    accept: "sort",
    hover({ item }:{item: TIngredientWithId}):void {
      if (item._customId === ingredient._customId) return;
      dispatch(
        changeIngredientsPlace({
          indexFrom: findIndex(item),
          indexTo: index,
          ingredient: item,
        })
      );
    },
  });
  return (
    <li className={styles.item} ref={(node) => dropRef(dragRef(node))}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient))}
      />
    </li>
  );
};

export default BurgerConstructorItem;
