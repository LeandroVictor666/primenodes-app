//#region Imports
import { Dispatch, SetStateAction } from "react";
import LoginFormUI from "./LoginFormUI";
//#endregion
export default function LoginUI({ renderModal }: { renderModal: Dispatch<SetStateAction<{ isActive: boolean; title: string; content: string; modalType: string }>> }) {
    return (
        <>
            <LoginFormUI renderModal={renderModal}/>
        </>
    )

}