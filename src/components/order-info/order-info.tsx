import React, { FC, useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  selectIngredients,
  selectOrderByNumber,
  selectOrders,
} from "../../services/reducers/dataReducer/selector";
import { TOrder } from "../../utils/types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-info.module.css";
import { fetchOrder } from "../../utils/api";



const OrderInfo: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state?.background;

  const orders = useAppSelector(selectOrders);
 

  let orderMatch: TOrder | null = null;
  const ingredients = useAppSelector(selectIngredients);
 useEffect(() => {
    if (location.pathname.startsWith('/profile')&& !background) {
       id && dispatch(fetchOrder(id))
    } else 
if ((location.pathname.startsWith('/feed')) && !background) {
       id && dispatch(fetchOrder(id))
     }
 }, [location.pathname]);
  
 orderMatch = orders?.orders.find((order) => order.number.toString() === id) || null;

  const returnIngredients = useCallback(() => {
    const newIngredients = Array.from(new Set(orderMatch?.ingredients));
    return newIngredients.map((ingredient) => {
      return ingredients?.find((item) => item?._id === ingredient);
    });
  }, [orderMatch]);
  const returnIngredientsAmount = useCallback(
    (id: string | undefined) => {
      let ingredientsAmount = 0;
      orderMatch?.ingredients.map((ingredientId) => {
        if (ingredientId === id) ingredientsAmount++;
      });
      return ingredientsAmount;
    },
    [orderMatch?.ingredients]
  );
  const returnIngredientsPrice = useCallback(() => {
    const ingredientsPrice = orderMatch?.ingredients
      ?.map(
        (ingredient) =>
          ingredients?.find((item) => item?._id === ingredient)?.price
      )
      ?.reduce((sum: number, item: number | undefined) => {
        if (item) {
          sum += item;
        }
        return sum;
      }, 0);

    return ingredientsPrice;
  }, [orderMatch?.ingredients]);

  return orderMatch ? (
    <div className={`pl-10 pr-10 pb-10 ${styles.order_details}`}>
      <p className={`${!background? styles.centeredHeader : styles.header} text text_type_digits-default`}>
        {`#${orderMatch.number}`}
      </p>
      <p className={`mt-10 text text_type_main-medium`}>{`${orderMatch.name}`}</p>
      <p
        className={`mt-2 mb-15 text text_type_main-small ${
          orderMatch.status === "done" ? "text_color_success" : ""
        }`}
      >
        {`${orderMatch.status === "done" ? "Выполнен" : "Готовится"}`}
      </p>
      <p className={`mb-6 text text_type_main-medium`}>Состав:</p>
      <ul className={`mb-10 pr-8 pt-1 pb-1 ${styles.list}`}>
        {returnIngredients().map((ingredient) => {
          return (
            <li key={ingredient?._id} className={styles.item}>
              <div className={styles.item_container}>
                <img
                  src={ingredient?.image}
                  alt={ingredient?.name}
                  className={styles.item_image}
                />
                <p className={`text text_type_main-small ${styles.item_name}`}>{ingredient?.name}</p>
              </div>
              <div className={styles.item_sum}>
                <p
                  className={`mr-2 text text_type_digits-default`}
                >{`${returnIngredientsAmount(ingredient?._id)} x ${
                  ingredient?.price
                }`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.footer}>
        <p className={`text text_color_inactive text_type_main-default`}>
          <FormattedDate date={new Date(orderMatch.createdAt)} />
        </p>
        <div className={styles.sum}>
          <p className={`mr-2 text text_type_digits-default`}>
            {returnIngredientsPrice()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) :  null
};

export default OrderInfo;