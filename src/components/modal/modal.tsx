//system
import React, { FC, ReactComponentElement, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
//components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

//styles
import styles from "./modal.module.css";

const modal = document.getElementById("modal-root") as HTMLElement;
type TModalProps = {
  title: string,
  children: ReactNode,
  handleClose: ()=>void

}

const Modal:FC<TModalProps> = ({ title, children, handleClose }) => {


  useEffect(() => {
    const handleEscape = (event:KeyboardEvent) => {
      event.key === "Escape" && handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.modal_header} mt-10 ml-10 mr-10`}>
          <h1 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h1>
          <button className={styles.close} onClick={handleClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose} />
    </>,
     modal
  );
}


export default Modal;
