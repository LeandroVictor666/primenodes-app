import * as ReduxToolkit from "@reduxjs/toolkit";
import counterReducer from "./Counter.Redux"; // Importe o reducer gerado pelo createSlice
import AuthenticationRedux from "./Authentication.Redux";
import ModalRedux from "./Modal.Redux";
import IModal from "@/Interface/ModalInterface/ModalInterface";

export interface IReducerProps {
    counter: {
        total:number;
    }
    modal:IModal;
}
const store = ReduxToolkit.configureStore({
    reducer: {
        counter: counterReducer, // Use o reducer gerado pelo createSlice
        authentication: AuthenticationRedux,
        modal:ModalRedux
    },
});

export default store;
