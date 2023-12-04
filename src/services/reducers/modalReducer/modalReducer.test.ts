import { closeModal, initialModalState, modalReducer, openModal } from "./modalReducer";

describe("Testing modalSlice", () => {
    test("Return initialState", () => {
        expect(modalReducer(undefined, { type: undefined })).toEqual(initialModalState);
      });
      test("Open modal", () => {
        expect(modalReducer(initialModalState, openModal('type'))).toEqual({
            isOpen: true,
            typeOfModal: 'type'
        });
      });
      test("Close modal", () => {
        expect(modalReducer(initialModalState, closeModal())).toEqual({
            isOpen: false,
            typeOfModal: null
        });
      });
});
