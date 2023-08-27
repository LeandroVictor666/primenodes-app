import IMyAccount from "@/Interface/MyAccountInterface/IMyAccount";
import HttpPostRequest from "../HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";
import CacheController from "../Cache/CacheController";
import { cacheElements } from "@/Interface/CacheInterface/ICacheInterface";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
import { ServerResponse } from "@/types/serverresponse";

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
        var formData = new FormData();
        formData.append("newUsername", newUsername);
        const httpPostRequest = new HttpPostRequest();
        const HttpConfigurations: HttpPostRequestType = {
            url: "/api/updateUsername",
            header: {
                Authentication: `Bearer ${this.tokenAuth}`,
                "Content-Type": "application/json",
            },
            body: formData,
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

    updateEmail(): void {}
    updateDateOfBirthday(): void {}
}
