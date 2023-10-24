//system
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
//components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

//styles
import styles from "./modal.module.css";
//redux
import { closeModal } from "../../services/reducers/modalReducer/modalReducer";
import { removeIngredientData } from "../../services/reducers/dataReducer/dataReducer";

const modal = document.getElementById("modal-root");

function Modal({ title, children }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
    dispatch(removeIngredientData());
  };
  function handleEscape(e) {
    e.key === "Escape" && handleClose();
  }
  useEffect(() => {
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
      <ModalOverlay />
    </>,
    modal
  );
}

Modal.ropTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
export default Modal;
