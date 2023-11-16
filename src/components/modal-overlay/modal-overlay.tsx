import React, { FC } from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";
type TModalOverlayProps = {
 
  handleClose: ()=>void

}
const ModalOverlay:FC<TModalOverlayProps> = ({ handleClose }) => {
  return <div className={styles.overlay} onClick={handleClose}></div>;
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
