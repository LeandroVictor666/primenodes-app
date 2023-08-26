import IModal from "@/Interface/ModalInterface/ModalInterface";
import * as ReduxToolkit from "@reduxjs/toolkit";

export enum ModalType {
    success = "success",
    failure = "failure",
    alert = "alert",
}

const initialState: IModal = {
    title: undefined,
    content: undefined,
    modalType: undefined,
    isActive: false,
};

interface actionProps {
    type: string;
    payload: IModal;
}

const ModalSlice = ReduxToolkit.createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        showModal(state, action: actionProps) {
            console.log("called");
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.modalType = action.payload.modalType;
            state.isActive = true;
        },
        hiddenModal(state) {
            state.title = undefined;
            state.content = undefined;
            state.modalType = undefined;
            state.isActive = false;
        },
    },
});

export const { showModal, hiddenModal } = ModalSlice.actions;
export default ModalSlice.reducer;
