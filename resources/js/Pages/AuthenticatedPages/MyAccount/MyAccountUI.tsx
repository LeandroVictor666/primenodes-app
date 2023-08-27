import { usePage } from "@inertiajs/react";
import Styles from "../../../../css/styles.module.css";
import * as ReactRedux from "react-redux";
import * as ReduxToolkit from "@reduxjs/toolkit";
import { ModalFormUI } from "@/Components/ModalUI/ModalFormUI/ModalFormUI";
import { hiddenModalForm, showModalForm } from "@/Redux/ModalForm.Redux";
import MyAccountController from "@/Controllers/MyAccount/MyAccount";
import { ServerResponse } from "@/types/serverresponse";
import { ModalType, showModal } from "@/Redux/Modal.Redux";
import CacheController from "@/Controllers/Cache/CacheController";
import { cacheElements } from "@/Interface/CacheInterface/ICacheInterface";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
import { title } from "process";

interface AccountProps {
    id: number;
    username: string;
    full_name: string;
    email: string;
    email_status: string;
    date_of_birth: string;
    token: string;
};


/**
 * Esconde modal com input, e apresenta modal com informações da resposta para o usuario.
 * Essa pequena função é para tentar manter o codigo organizado, por mais que sejam só 2 linhas, já deixou o codigo com uma cara bem melhor.
 * @param title 
 * @param content 
 * @param modalType 
 * @param Dispatch 
 * @returns void
 */
function dispatchUI(title: string, content: string, modalType: ModalType, Dispatch: ReduxToolkit.Dispatch<ReduxToolkit.AnyAction>) {
    Dispatch(hiddenModalForm());
    Dispatch(showModal({ title: title, content: content, isActive: true, modalType: modalType }));
    return;
}

/**
 * ChangerUsernameHandler
 * Função FORA do componente, para caso o component seja re-renderizado pelo React, a função também não seja recarregada, pois não tem necessidade
 * Por isso passo o "dispatch" como parametro.
 * @param input 
 * @param token 
 * @param dispatch 
 */
const changeUsername = async (input: string, token: string, dispatch: ReduxToolkit.Dispatch<ReduxToolkit.AnyAction>) => {
    const myAccountController = new MyAccountController(token);
    var serverResponse: ServerResponse;
    await myAccountController.updateUsername(input)
        .then(response => {
            if (response === undefined) {
                dispatchUI('Failed to change Username', 'Failed to update Username, try again in few hours.', ModalType.failure, dispatch);
                setTimeout(() => {
                    window.location.reload();
                }, 3250);
                return;
            }
            serverResponse = response;

            if (serverResponse.isError !== "true") {
                console.log(`serverResponse:: ${serverResponse}`);
                dispatchUI('Username changed successfully!', serverResponse.response, ModalType.success, dispatch);
                setTimeout(() => {
                    var cacheController = new CacheController();
                    var cacheEl: cacheElements = {
                        cacheName: "Authentication",
                        cacheValue: undefined,
                        storageType: StorageTypes.localStorage,
                    };
                    cacheController.removeCache(cacheEl);
                    window.location.href = "/login";
                }, 3200);
            } else {
                dispatchUI('Failed to change Username.', serverResponse.response, ModalType.failure, dispatch);
                setTimeout(() => {
                    window.location.reload();
                }, 3250);
                return;
            }
        })
        .catch(error => {
            if (error === undefined) {
                dispatchUI('Failed to change Username', 'Failed to update Username, try again in few hours.', ModalType.failure, dispatch);
                setTimeout(() => {
                    window.location.reload();
                }, 3250);
                return;
            };
            dispatchUI('Failed to change Username.', error.response[0].response, ModalType.failure, dispatch);
            setTimeout(() => {
                window.location.reload();
            }, 3250);
            return;
        });
};

const changeEmail = async (input: string, token: string, dispatch: ReduxToolkit.Dispatch<ReduxToolkit.AnyAction>) => {

    const myAccountController = new MyAccountController(token);
    var serverResponse: ServerResponse;
    await myAccountController.updateEmail(input)
        .then(response => {
            if (response === undefined) {
                dispatchUI('Failed to change E-Mail', 'Failed to update E-Mail, try again in few hours.', ModalType.failure, dispatch);
                setTimeout(() => {
                    window.location.reload();
                }, 3250);
                return;
            }
            serverResponse = response;

            if (serverResponse.isError !== "true") {
                console.log(`serverResponse:: ${serverResponse}`);
                dispatchUI('E-Mail changed successfully!', serverResponse.response, ModalType.success, dispatch);
                setTimeout(() => {
                    var cacheController = new CacheController();
                    var cacheEl: cacheElements = {
                        cacheName: "Authentication",
                        cacheValue: undefined,
                        storageType: StorageTypes.localStorage,
                    };
                    cacheController.removeCache(cacheEl);
                    window.location.href = "/login";
                }, 3200);
            } else {
                dispatchUI('Failed to change E-Mail.', serverResponse.response, ModalType.failure, dispatch);
                setTimeout(() => {
                    window.location.reload();
                }, 3250);
                return;
            }
        })
        .catch(error => {
            if (error === undefined) {
                dispatchUI('Failed to change E-Mail', 'Failed to update E-Mail, try again in few hours.', ModalType.failure, dispatch);
                setTimeout(() => {
                    window.location.reload();
                }, 3250);
                return;
            };
            dispatchUI('Failed to change E-Mail.', error.response[0].response, ModalType.failure, dispatch);
            setTimeout(() => {
                window.location.reload();
            }, 3250);
            return;
        });

}



/**
 * MyAccount Component.
 * @returns 
 */
export const MyAccountUI = () => {
    const userAccount: AccountProps = usePage().props.AccountInformations as AccountProps;

    const Dispatch = ReactRedux.useDispatch();
    return (
        <>
            <ModalFormUI />
            <div className={Styles.MyAccountContainer}>
                <div className={Styles.MyAccountHeader}>
                    <img className={Styles.MyAccountPfp} src="https://avatars.githubusercontent.com/u/141360333?v=4" alt="" />
                    <p>{userAccount.full_name}</p>
                </div>
                <div className={Styles.MyAccountInformationsContainer}>
                    <p>ID = {userAccount.id}</p>
                    <p onClick={() => Dispatch(showModalForm({ title: 'Input Your New Username', isActive: true, fnToExecute: async (input: string) => await changeUsername(input, userAccount.token, Dispatch) }))}>Username = {userAccount.username}</p>
                    <p onClick={() => Dispatch(showModalForm({ title: 'Input Your New E-Mail.', isActive: true, fnToExecute: async (input: string) => await changeEmail(input, userAccount.token, Dispatch) }))}>Email = {userAccount.email}</p>
                    <p>Email Status = {userAccount.email_status}</p>
                    <p>Date Of Birthday: {userAccount.date_of_birth}</p>
                    <p>Secret Token: {userAccount.token}</p>
                </div>

            </div>
        </>
    )

}