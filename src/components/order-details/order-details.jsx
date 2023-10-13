import React from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import PropTypes from "prop-types";

function OrderDetails({ order }) {
  return (
    <>
      <h2 className={`text text_type_digits-large mt-4 mb-8 ${styles.number}`}>
        {order._id}
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
OrderDetails.propTypes = {
  order: PropTypes.objectOf(PropTypes.string),
};
export default OrderDetails;
