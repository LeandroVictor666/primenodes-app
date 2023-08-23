
import Style from "../../../css/styles.module.css";
import ModalHeaderUI from "./ModalHeaderUI";
import ModalBodyUI from "./ModalBodyUI";
import { IModalObject } from "@/types/modalObject";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function ModalUI({ modalInterface, renderModal }: { modalInterface: IModalObject, renderModal: Dispatch<SetStateAction<{ isActive: boolean; title: string; content: string; modalType: string }>> }): React.ReactElement | null {
    useEffect(() => {
        setTimeout(() => {
            renderModal({ isActive: false, title: '', content: '', modalType: '' })
        }, 4800);
    }, [modalInterface.isActive])
    if (modalInterface.isActive == true) {
        return (
            <div className={Style.ModalMain}>
                <ModalHeaderUI title={modalInterface.title}></ModalHeaderUI>
                <ModalBodyUI content={modalInterface.content} modaltype={modalInterface.modalType} />
            </div>
        )
    } else {
        return null;
    }
}