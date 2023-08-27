import IModalForm from "../Interface/ModalInterface/ModalFormInterface";
import * as ReduxToolkit from "@reduxjs/toolkit";

export enum ModalType {
    success = "success",
    failure = "failure",
    alert = "alert",
}

const initialState: IModalForm = {
    title: undefined,
    fnToExecute: (input: string) => () => {},
    isActive: false,
};

interface actionProps {
    type: string;
    payload: IModalForm;
}

const ModalFormSlice = ReduxToolkit.createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        showModalForm(state, action: actionProps) {
            console.log("called");
            state.title = action.payload.title;
            state.fnToExecute = action.payload.fnToExecute;
            state.isActive = true;
        },
        hiddenModalForm(state) {
            state.title = undefined;
            state.fnToExecute = ()=> {};
            state.isActive = false;
        },
    },
});

export const { showModalForm, hiddenModalForm } = ModalFormSlice.actions;
export default ModalFormSlice.reducer;
