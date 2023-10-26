//system
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ingredientPropType } from "../../../utils/prop-types";
import PropTypes from "prop-types";

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

function BurgerConstructorItem({ ingredient, index }) {
  const dispatch = useDispatch();
  const burgerIngredientsArr = useSelector(selectBurgerIngredients);
  const findIndex = (el) => burgerIngredientsArr.indexOf(el);
  const [, dragRef] = useDrag({
    type: "sort",
    item: { item: ingredient },
  });
  const [, dropRef] = useDrop({
    accept: "sort",
    hover({ item }) {
      if (item._customId === ingredient._customId) return;
      console.log("budums");
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
}
BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number,
};
export default BurgerConstructorItem;
