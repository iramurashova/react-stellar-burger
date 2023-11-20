import { RootStore } from "../../store";

export const selectModalOpen = (store: RootStore) => store.modal.isOpen;
export const selectTypeOfModal = (store: RootStore) => store.modal.typeOfModal;
