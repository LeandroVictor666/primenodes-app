import Header from "@/Components/Header/Header";
import RegisterBox from "./RegisterBox";
import { IModalObject } from "@/types/modalObject";
import { Dispatch, SetStateAction } from "react";

export default function RegisterUI({ renderModal }: { renderModal: Dispatch<SetStateAction<{ isActive: boolean; title: string; content: string; modalType: string; }>> }) {
    return (
        <>
            <RegisterBox renderModal={renderModal}/>
        </>
    )
}