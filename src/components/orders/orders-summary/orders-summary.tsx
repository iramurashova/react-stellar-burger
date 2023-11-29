import React, { FC, useMemo } from "react";
import { TOrders } from "../../../utils/types";
import styles from "./orders-summary.module.css";
import { useAppSelector } from "../../../utils/hooks";
import {
  selectOrders,
  selectTotal,
  selectTotalToday,
} from "../../../services/reducers/dataReducer/selector";

const OrdersSummary: FC = () => {
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);
  const orders = useAppSelector(selectOrders);
 
  const readyOrders = useMemo(
    () =>
      orders?.orders
        ?.filter((item) => item.status === "done")
        .map((item) => <li key={item._id}>{item.number}</li>),
    [orders]
  );
  const pendingOrders = useMemo(
    () =>
      orders?.orders
        ?.filter((item) => item.status === "pending")
        .map((item) => <li key={item._id}>{item.number}</li>),
    [orders]
  );
 
  return (
    <>
      <div className={styles.summary_container}>
        <div className={styles.column}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <ul
            className={`text_type_digits-default text_color_success ${styles.order_numbers}`}
          >
            {readyOrders}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <ul
            className={`text_type_digits-default ${styles.ready_order_numbers}`}
          >
           {pendingOrders}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className={`text text_type_digits-large mt-4 mb-8 ${styles.number}`}>
        {total}
        </p>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={`text text_type_digits-large mt-4 mb-8 ${styles.number}`}>
       {totalToday}
        </p>
      </div>
    </>
  );
};

export default OrdersSummary;
