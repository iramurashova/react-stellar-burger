import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
