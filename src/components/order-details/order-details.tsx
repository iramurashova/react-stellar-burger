import React from "react";
import styles from "./order-details.module.css";
import { selectOrderNumber } from "../../services/reducers/orderReducer/selector";
import { useAppSelector } from "../../utils/hooks";

function OrderDetails() {
  const orderNumber = useAppSelector(selectOrderNumber);
  const order = {
    status: "Ваш заказ начали готовить",
    message: "Дождитесь готовности на орбитальной станции",
  };

  return (
    <>
      <h2 className={`${styles.number} text text_type_digits-large mb-8`}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.check}></div>
      <p className="text text_type_main-default mb-2">{order.status}</p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        {order.message}
      </p>
    </>
  );
}

export default OrderDetails;
