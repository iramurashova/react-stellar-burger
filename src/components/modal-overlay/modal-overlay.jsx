import React from "react";
import styles from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/reducers/modalReducer/modalReducer";
import { removeIngredientData } from "../../services/reducers/dataReducer/dataReducer";

function ModalOverlay() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
    dispatch(removeIngredientData());
  };
  return (
    <div className={styles.overlay} onClick={handleClose}>
    
    </div>
  );
}


export default ModalOverlay;
