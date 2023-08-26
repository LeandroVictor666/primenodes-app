//#region Imports
import Styles from "../../../css/styles.module.css";
import * as React from "react";
import CacheController from "@/Controllers/Cache/CacheController";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
import HttpPostRequest from "@/Controllers/HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpPostRequestType/HttpPostRequestType";
import { AUTHENTICATION_CACHE_NAME } from "@/_GLOBALS/_GLOBALS";
import * as AuthFunctions from "@/Functions/AuthenticationFunctions";
import * as ReactRedux from "react-redux";
import IModal from "@/Interface/ModalInterface/ModalInterface";
import { ModalType, showModal } from "@/Redux/Modal.Redux";
import { updateAuth } from "@/Redux/Authentication.Redux";
//#endregion


export default function LoginFormUI() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const Dispatch = ReactRedux.useDispatch();
    function validateInput(input: string, min: number, max: number): boolean {
        if (input.length > min && input.length < max) {
            return true;
        }
        return false;
    }
    async function loginFireEvent(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        if (!validateInput(username, 3, 35)) {
            const Payload: IModal = { title: 'Login Failed', content: 'Invalid username, min username characters: 3, max: 35', modalType: ModalType.failure, isActive: true };
            Dispatch(showModal(Payload));
            return;
        } else if (!validateInput(password, 4, 255)) {
            const Payload: IModal = { title: 'Login Failed', content: "invalid password, min password characters: 4, max: 255", modalType: ModalType.failure, isActive: true };
            Dispatch(showModal(Payload));
            return;
        }

        const deviceName: string = navigator.userAgent;
        var postData = new FormData();
        postData.append("username", username);
        postData.append("password", password);
        postData.append("device_name", deviceName);
        var HttpPostClient = new HttpPostRequest();
        var configurations: HttpPostRequestType = {
            url: '/api/login',
            header: {
                "Content-Type": "application/json"
            },
            body: postData
        };
        var serverResponse: LoginModel | undefined;
        await HttpPostClient.fetchPost(configurations)
            .then(r => {
                serverResponse = r;
            })
            .catch(error => {
                const Payload: IModal = { title: 'API Connection Error', content: "API Connection error, wait some minutes and try again", modalType: ModalType.failure, isActive: true };
                Dispatch(showModal(Payload));
                return;
            });

        if (serverResponse === undefined) {
            const Payload: IModal = { title: 'API Connection Error', content: "API Connection error, wait some minutes and try again", modalType: ModalType.failure, isActive: true };
            Dispatch(showModal(Payload));
            return;
        }
        if (serverResponse?.isError == 'true') {
            const Payload: IModal = { title: 'Login Failed', content: serverResponse.response, modalType: ModalType.failure, isActive: true };
            Dispatch(showModal(Payload));
            return;
        }

        var bruteCacheValue = {
            full_name: serverResponse.full_name,
            email: serverResponse.email,
            token: serverResponse.token
        }

        var cacheValue: string = JSON.stringify(bruteCacheValue);
        var cacheController = new CacheController();
        const cacheConfiguration = {
            cacheName: AUTHENTICATION_CACHE_NAME,
            cacheValue: cacheValue,
            storageType: StorageTypes.localStorage
        };
        if (!cacheController.saveCache(cacheConfiguration)) {
            const Payload: IModal = { title: 'Login Failed', content: "Failed To Save Authentication Session", modalType: ModalType.failure, isActive: true };
            Dispatch(showModal(Payload));
            return;
        };
        const AccountPayload = {
            email: serverResponse.email,
            fullName: serverResponse.full_name,
            token: serverResponse.token
        };
        Dispatch(updateAuth(AccountPayload));
        const Payload: IModal = { title: 'Login Sucessfull', content: serverResponse.response, modalType: ModalType.success, isActive: true };
        Dispatch(showModal(Payload));
        setTimeout(() => {
            window.location.href = "/";
            return;
        }, 5400);
    }
    return (
        <form className={Styles.LoginFormDiv} method="POST">
            <div className={Styles.Header}>
                <p>Authenticate</p>
            </div>
            <input type="text" placeholder="Username../" onChange={(e) => { setUsername(e.target.value) }} value={username}></input>
            <input type="password" placeholder="Password../" onChange={(e) => { setPassword(e.target.value) }} value={password}></input>
            <input type="submit" onClick={(e) => { loginFireEvent(e) }} name="login" value={'Login'}></input>
            <input type="submit" id="id_forgot_password" name="forgot_password" value="Forgot your password?"></input>
        </form>
    )

}