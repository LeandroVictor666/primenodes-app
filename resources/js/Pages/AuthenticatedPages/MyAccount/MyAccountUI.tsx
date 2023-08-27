import { usePage } from "@inertiajs/react";
import Styles from "../../../../css/styles.module.css";
import * as ReactRedux from "react-redux";
import { ModalFormUI } from "@/Components/ModalUI/ModalFormUI/ModalFormUI";
import { ModalType, showModal } from "@/Redux/Modal.Redux";
import { showModalForm } from "@/Redux/ModalForm.Redux";
import MyAccountController from "@/Controllers/MyAccount/MyAccount";
import CacheController from "@/Controllers/Cache/CacheController";
import { cacheElements } from "@/Interface/CacheInterface/ICacheInterface";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
import { ServerResponse } from "@/types/serverresponse";

interface AccountProps {
    id: number;
    username: string;
    full_name: string;
    email: string;
    email_status: string;
    date_of_birth: string;
    token: string;
};
const changeUsername = () => {


}

const callModalForm = () => {



}

export const MyAccountUI = () => {
    const userAccount: AccountProps = usePage().props.AccountInformations as AccountProps;

    const Dispatch = ReactRedux.useDispatch();
    const changeUsername = async (input: string) => {
        const myAccountController = new MyAccountController(userAccount.token);

        await myAccountController.updateUsername(input)
            .then(response => {

            })
            .catch(error => {
                console.log(`error->`, error);
                return;
            });

    }
    return (
        <>
            <ModalFormUI />
            <div className={Styles.MyAccountContainer}>
                <div className={Styles.MyAccountHeader}>
                    <img className={Styles.MyAccountPfp} src="https://avatars.githubusercontent.com/u/141360333?v=4" alt="" />
                    <p>{userAccount.full_name}</p>
                </div>
                <div className={Styles.MyAccountInformationsContainer}>
                    <p>This is MyAccount-Authenticated Route!</p>
                    <p>ID = {userAccount.id}</p>
                    <p onClick={() => Dispatch(showModalForm({ title: 'Input Your New Username', isActive: true, fnToExecute: async (input: string) => await changeUsername(input) }))}>Username = {userAccount.username}</p>
                    <p>Email = {userAccount.email}</p>
                    <p>Email Status = {userAccount.email_status}</p>
                    <p>Date Of Birthday: {userAccount.date_of_birth}</p>
                    <p>Secret Token: {userAccount.token}</p>
                </div>

            </div>
        </>
    )

}