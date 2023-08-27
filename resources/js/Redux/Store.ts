import * as ReduxToolkit from "@reduxjs/toolkit";
import counterReducer from "./Counter.Redux"; // Importe o reducer gerado pelo createSlice
import AuthenticationRedux from "./Authentication.Redux";
import ModalRedux from "./Modal.Redux";
import ModalFormRedux from "./ModalForm.Redux";
import IModal from "@/Interface/ModalInterface/ModalInterface";
import IModalForm from "@/Interface/ModalInterface/ModalFormInterface";




export interface IReducerProps {
    counter: {
        total:number;
    }
    modal:IModal;
    modalForm:IModalForm;
}
const store = ReduxToolkit.configureStore({
    reducer: {
        counter: counterReducer, // Use o reducer gerado pelo createSlice
        authentication: AuthenticationRedux,
        modal:ModalRedux,
        modalForm:ModalFormRedux,
    },

});

export default store;
