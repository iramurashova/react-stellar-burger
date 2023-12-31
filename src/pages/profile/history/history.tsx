import React, { FC, useEffect } from "react";
import styles from "./history.module.css";
import Orders from "../../../components/orders/orders";
import { useAppDispatch } from "../../../utils/hooks";
import { useLocation } from "react-router";
import {
  setWebsocketConnection,
  setWebsocketOffline,
} from "../../../services/reducers/dataReducer/dataReducer";
import { wssAdress } from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
const HistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accessToken = getCookie("accessToken")?.split("Bearer ")[1];
  useEffect(() => {
    dispatch(
      setWebsocketConnection(`${wssAdress}/orders?token=${accessToken}`)
    );
    return () => {
      dispatch(setWebsocketOffline());
    };
  }, [location.pathname]);
  return (
    <div className={`${styles.history}`}>
      <Orders isStatus={true} />
    </div>
  );
};

export default HistoryPage;
