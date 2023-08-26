
import Style from "../../../css/styles.module.css";
import ModalHeaderUI from "./ModalHeaderUI";
import ModalBodyUI from "./ModalBodyUI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReducerProps } from "@/Redux/Store";
import { hiddenModal } from "@/Redux/Modal.Redux";

export default function ModalUI() {

    const dispatch = useDispatch();
    const thisModal = useSelector((state: IReducerProps) => state.modal);
    useEffect(() => {
        setTimeout(() => {
            dispatch(hiddenModal());
        }, 4800);
    }, [thisModal.isActive])


    if (thisModal.isActive === true) {
        return (
            <div className={Style.ModalMain}>
                <ModalHeaderUI title={thisModal.title}></ModalHeaderUI>
                <ModalBodyUI content={thisModal.content} modaltype={thisModal.modalType} />
            </div>
        )
    };
}