import React, { FC } from "react";
import styles from "./modal-overlay.module.css";
type TModalOverlayProps = {
  handleClose: () => void;
};
const ModalOverlay: FC<TModalOverlayProps> = ({ handleClose }) => {
  return <div className={styles.overlay} onClick={handleClose}></div>;
};

export default ModalOverlay;
