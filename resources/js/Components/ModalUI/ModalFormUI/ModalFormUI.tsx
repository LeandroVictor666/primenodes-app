import * as ReactRedux from "react-redux";
import IModalForm from "@/Interface/ModalInterface/ModalFormInterface";
import Styles from "../../../../css/styles.module.css";
import { IReducerProps } from "@/Redux/Store";
import { ChangeEvent, useState } from "react";
export const ModalFormUI = () => {
    const thisModal = ReactRedux.useSelector((state: IReducerProps) => state.modalForm);
    const [inputState, setInput] = useState<string>('');
    const changeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        return;
    }

    if (thisModal.isActive === true) {
        return (
            <div className={Styles.ModalFormUI}>
                <div className={Styles.ModalFormHeader}>
                    <p>{thisModal.title}</p>
                </div>
                <div className={Styles.ModalFormDivContent}>
                    <input type="text" onChange={(e) => { changeInputHandler(e) }} value={inputState}></input>
                    <button className={Styles.ModalFormButton} onClick={() => {thisModal.fnToExecute(inputState)}}>Send</button>
                </div>

            </div>
        )
    }




}

