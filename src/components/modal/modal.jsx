//system
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
//components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

//styles
import styles from "./modal.module.css";

const modal = document.getElementById("modal-root");

function Modal({ title, children, handleClose }) {


  useEffect(() => {
    const handleEscape = (e) => {
      e.key === "Escape" && handleClose();
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
          <h2 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h2>
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

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
};
export default Modal;
