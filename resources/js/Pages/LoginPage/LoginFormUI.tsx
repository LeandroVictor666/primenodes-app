//#region Imports
import Styles from "../../../css/styles.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ServerResponse } from "@/types/serverresponse";
import CacheController from "@/Controllers/Cache/CacheController";
import { cacheElements } from "@/Interface/CacheInterface/ICacheInterface";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
import * as React from "react";
import HttpPostRequest from "@/Controllers/HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpPostRequestType/HttpPostRequestType";
//#endregion


export default function LoginFormUI({ renderModal }: { renderModal: Dispatch<SetStateAction<{ isActive: boolean; title: string; content: string; modalType: string }>> }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function validateInput(input: string, min: number, max: number): boolean {
        if (input.length > min && input.length < max) {
            return true;
        }
        return false;
    }
    async function loginFireEvent(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        if (!validateInput(username, 3, 35)) {
            renderModal({ isActive: true, title: 'title', content: "invalid username, min username characters: 3, max: 35", modalType: 'failure' });
            return;
        } else if (!validateInput(password, 4, 255)) {
            renderModal({ isActive: true, title: 'title', content: "invalid password, min password characters: 4, max: 255", modalType: 'failure' });
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
                renderModal({ isActive: true, title: "API Connection Error", content: "API Connection error, wait some minutes and try again.", modalType: "failure" })
                return;
            });

        if (serverResponse === undefined) {
            renderModal({ isActive: true, title: "API Connection Error", content: "API Connection error, wait some minutes and try again.", modalType: "failure" })
            return;
        }
        if (serverResponse?.isError == 'true') {
            renderModal({ isActive: true, title: 'title', content: serverResponse.response, modalType: 'failure' });
            return;
        }

        var cacheController = new CacheController();
        const cacheConfiguration = {
            cacheName: 'AuthenticationToken',
            cacheValue: serverResponse?.token,
            storageType: StorageTypes.localStorage
        }
        if (!cacheController.saveCache(cacheConfiguration)) {
            renderModal({ isActive: true, title: 'title', content: "Failed To Save Authentication Session.", modalType: 'failure' });
        };
        renderModal({ isActive: true, title: 'Login Sucessfull', content: serverResponse?.response, modalType: 'success' });
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