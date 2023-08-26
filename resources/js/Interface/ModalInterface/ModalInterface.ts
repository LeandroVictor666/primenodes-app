import { ModalType } from "@/types/modaltype";

export default interface IModal {
    title: string | undefined;
    content: string | undefined;
    modalType: ModalType | undefined;
    isActive: boolean | undefined;
}
