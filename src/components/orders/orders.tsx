import React, { FC, useEffect } from "react";
import styles from "./orders.module.css";

import { useLocation } from "react-router";
import { useAppSelector } from "../../utils/hooks";
import { selectOrders } from "../../services/reducers/dataReducer/selector";

import { Link } from "react-router-dom";
import Order from "../order/order";
type TOrdersProps = {
  isStatus: boolean;
};
const Orders: FC<TOrdersProps> = ({ isStatus }) => {
  const location = useLocation();
  const orders = useAppSelector(selectOrders);

  return (
    <ul className={styles.orders}>
      {orders?.orders.map((order) => (
        <Link
          className={`text_color_primary ${styles.link}`}
          key={order.number}
          state={{ background: location }}
          to={{
            pathname: location.pathname.startsWith("/profile")
              ? `/profile/orders/${order.number}`
              : `/feed/${order.number}`,
          }}
        >
          <Order orderInfo={order} isStatus={isStatus} />
        </Link>
      ))}
    </ul>
  );
};

export default Orders;
