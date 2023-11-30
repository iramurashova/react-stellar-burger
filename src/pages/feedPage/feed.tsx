import React, { FC, useEffect } from "react";
import styles from "./feed.module.css";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectOrders } from "../../services/reducers/dataReducer/selector";
import { wssAdress } from "../../utils/constants";
import {
  setWebsocketConnection,
  setWebsocketOffline,
} from "../../services/reducers/dataReducer/dataReducer";
import Orders from "../../components/orders/orders";
import OrdersSummary from "../../components/orders/orders-summary/orders-summary";

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    location.pathname.startsWith("/feed") &&
      dispatch(setWebsocketConnection(`${wssAdress}/orders/all`));
    return () => {
      dispatch(setWebsocketOffline());
    };
  }, []);

  return (
    <section className={`${styles.orders} pr-10 pl-10`}>
      <h1 className={`text text_type_main-large pb-4 ${styles.header}`}>
        Лента заказов
      </h1>
      <div className={styles.ribbon}>
        <Orders isStatus={false} />
      </div>
      <div className={styles.summary}>
        <OrdersSummary />
      </div>
    </section>
  );
};

export default FeedPage;
