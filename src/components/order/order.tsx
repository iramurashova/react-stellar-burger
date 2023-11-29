import React, { FC, useCallback } from "react";
import styles from "./order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/types";
import { useAppSelector } from "../../utils/hooks";
import { selectIngredients } from "../../services/reducers/dataReducer/selector";
type TOrderProps = {
  orderInfo: TOrder;
  isStatus: boolean
};

const Order: FC<TOrderProps> = ({ orderInfo, isStatus }) => {
  const ingredients = useAppSelector(selectIngredients);
  const returnIngredients = useCallback(() => {
    const newIngredients = Array.from(new Set(orderInfo.ingredients)).slice(0,6);
    return newIngredients.map((ingredient) => {
      return ingredients?.find((item) => item._id === ingredient);
    });
  }, [orderInfo.ingredients]);

  const orderIngredients = returnIngredients();


  const returnIngredientsPrice = useCallback(() => {
    const arrayOfPrices = orderInfo?.ingredients?.map(ingredient => {
        if (ingredient !== null) {
            return ingredients?.find(item => item?._id === ingredient)?.price
        } else {
            return 0
        }
    })

    return arrayOfPrices.reduce((sum: number, item: number | undefined) => {
        if (item) {
            sum += item
        }
        return sum
    }, 0)
}, [orderInfo?.ingredients])

  return (
    <li className={`${styles.card} mb-6 pl-6 pr-6 pt-6 pb-6 mr-4`}>
      <div className={`${styles.row} mr-6`}>
        <p className="text text_type_digits-default">{orderInfo.number}</p>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(orderInfo?.createdAt)}
        />
      </div>
      <div className={`${styles.row} mt-6 mr-6`}>
        <h2 className="text text_type_main-medium">{orderInfo?.name}</h2>
      </div>
   {  isStatus && <div className={`${styles.row} mt-2 text_type_main-small ${orderInfo.status === "done" ? "text_color_success": ""}`}>{orderInfo.status === "done" ? "Выполнен" : "Готовится"}</div>}
      <div className={`${styles.row} mt-6 mr-6`}>
        <ul className={styles.images_row}>
         { orderIngredients.map((ingredient, index) => (<li key={index} className={styles[`ingredient_${index}`]}>  
          <img
              className={styles.image}
              src={ingredient?.image}
              alt={ingredient?.name}
            />
            </li>))}
        
          </ul>
          <p className={`${styles.price} text text_type_digits-default ml-6`}>
         {returnIngredientsPrice()}
          <CurrencyIcon type="primary" />
        </p>
        </div>
     
     
    </li>
  );
};

export default Order;
