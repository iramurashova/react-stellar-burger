// system
import React, { useState } from "react";

// components
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

// styles
import styles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const order = {
    _id: "034536",
    status: "Ваш заказ начали готовить",
    message: "Дождитесь готовности на орбитальной станции",
  };
  const [orderDetails, setOrderDetails] = useState(false);

  function closeModal() {
    setOrderDetails(false);
  }
  return (
    <>
      <section className={`mt-15 pl-4  ${styles.section}`}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-8 pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
          </li>
          <ul className={`${styles.middle_list} pr-2`}>
            <li className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
              />
            </li>
            <li className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
              />
            </li>
            <li className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
              />
            </li>
            <li className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
              />
            </li>
            <li className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
              />
            </li>
          </ul>

          <li className={`${styles.item} pl-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
          </li>
        </ul>
        <div className={styles.summary}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">610</p>

            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => setOrderDetails(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {orderDetails && (
        <Modal title="" onClose={closeModal}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
