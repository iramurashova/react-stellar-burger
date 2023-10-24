import React from "react";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";
import { selectOrderNumber } from "../../services/reducers/orderReducer/selector";


function OrderDetails() {
  const orderNumber = useSelector(selectOrderNumber);
  const order = {
    status: "Ваш заказ начали готовить",
    message: "Дождитесь готовности на орбитальной станции",
  };
  return (
    <>
      <h2 className={`text text_type_digits-large mt-4 mb-8 ${styles.number}`}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.check}></div>
      <p className="text text_type_main-default mb-2">{order.status}</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        {order.message}
      </p>
    </>
  );
}

export default OrderDetails;
