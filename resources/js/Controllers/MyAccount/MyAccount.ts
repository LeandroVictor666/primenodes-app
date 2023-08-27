import IMyAccount from "@/Interface/MyAccountInterface/IMyAccount";
import HttpPostRequest from "../HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";
import HttpPutClient from "../HttpClient/HttpPutClient";
import { HttpPutRequestType } from "@/types/HttpRequestType/HttpPutRequestType";
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
    ): Promise<JSON | undefined | ServerResponse> {
        if (newUsername.length < 3) {
            const response = [
                {
                    response: "Invalid Username length, MIN Length: 3",
                    isError: "true",
                },
            ];
            return Promise.reject(response);
        } else if (newUsername.length > 35) {
            const response = [
                {
                    response: "Invalid  Username length, MAX Length: 35",
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
                serverResponse = response;
                if (response.isError === "false") {
                    var cacheController = new CacheController();
                    var cacheEl: cacheElements = {
                        cacheName: "Authentication",
                        cacheValue: undefined,
                        storageType: StorageTypes.localStorage,
                    };
                    cacheController.removeCache(cacheEl);
                    window.location.href = "/login";
                    Promise.resolve(response);
                    return;
                }
                Promise.reject(serverResponse);
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }

    updateEmail(): void {}
    updateDateOfBirthday(): void {}
}
