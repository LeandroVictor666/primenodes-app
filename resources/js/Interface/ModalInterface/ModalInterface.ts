import { ModalType } from "@/Redux/Modal.Redux";

export default interface IModal {
    title: string | undefined;
    content: string | undefined;
    modalType: ModalType | undefined;
    isActive: boolean | undefined;
}
