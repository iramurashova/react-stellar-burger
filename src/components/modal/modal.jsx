import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modal = document.getElementById("modal-root");

function Modal({ title, children, onClose}) {
  function handleEscape(e) {
    e.key === "Escape" && onClose();
  }
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return createPortal(
    <>
      <div className={styles.modal} >
        <div className={`${styles.modal_header} mt-10 ml-10 mr-10`}>
          <h2 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h2>
          <button className={styles.close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </>,
    modal
  );
}

Modal.ropTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired
};
export default Modal;
