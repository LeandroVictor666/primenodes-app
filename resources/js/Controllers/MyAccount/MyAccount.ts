//#region imports
import IMyAccount from "@/Interface/MyAccountInterface/IMyAccount";
import HttpPostRequest from "../HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";
import { ServerResponse } from "@/types/serverresponse";
//#endregion

export default class MyAccountController implements IMyAccount {
    tokenAuth: string;
    constructor(tokenAuth: string) {
        this.tokenAuth = tokenAuth;
    }
    async updateUsername(
        newUsername: string
    ): Promise<ServerResponse | undefined> {
        if (newUsername.length < 3) {
            const response = [
                {
                    response:
                        "The new username field must be at least 4 characters.",
                    isError: "true",
                },
            ];
            return Promise.reject(response);
        } else if (newUsername.length > 35) {
            const response = [
                {
                    response:
                        "The new username field must not be greater than 35 characters.",
                    isError: "true",
                },
            ];
            return Promise.reject(response);
        }
        const formData = {
            newUsername: newUsername,
        };
        const httpPostRequest = new HttpPostRequest();
        const HttpConfigurations: HttpPostRequestType = {
            url: "/api/updateUsername",
            headers: {
                Authorization: `Bearer ${this.tokenAuth}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        var serverResponse;
        await httpPostRequest
            .fetchPost(HttpConfigurations)
            .then((response) => {
                serverResponse = response as ServerResponse;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
        if (serverResponse === undefined) return Promise.reject(undefined);
        return Promise.resolve(serverResponse);
    }

    async updateEmail(newEmail: string): Promise<ServerResponse | undefined> {
        if (newEmail.length < 3) {
            const response = [
                {
                    response:
                        "The new E-Mail field must be at least 3 characters.",
                    isError: "true",
                },
            ];
            return Promise.reject(response);
        } else if (newEmail.length > 255) {
            const response = [
                {
                    response:
                        "The new E-Mail field must not be greater than 255 characters.",
                    isError: "true",
                },
            ];
            return Promise.reject(response);
        }
        const bodyData = {
            newEmail: newEmail,
        };
        const httpPostRequest = new HttpPostRequest();
        const HttpConfigurations: HttpPostRequestType = {
            url: "/api/updateEmail",
            headers: {
                Authorization: `Bearer ${this.tokenAuth}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        };
        var serverResponse;
        await httpPostRequest
            .fetchPost(HttpConfigurations)
            .then((response) => {
                serverResponse = response as ServerResponse;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
        if (serverResponse === undefined) return Promise.reject(undefined);
        return Promise.resolve(serverResponse);
    }
    updateDateOfBirthday(): void {}
}
