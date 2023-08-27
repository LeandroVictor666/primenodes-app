import LoginInterface from "@/Interface/LoginInterface/LoginInterface";
import CacheController from "../Cache/CacheController";
import { cacheElements } from "@/Interface/CacheInterface/ICacheInterface";
import * as Globals from "@/_GLOBALS/_GLOBALS";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
import HttpPostRequest from "../HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpPostRequestType/HttpPostRequestType";
import * as ReactRedux from "react-redux";
import { removeAuth } from "@/Redux/Authentication.Redux";
import { AccountData } from "@/types/Account/AccountData";
export default class LoginController implements LoginInterface {
    /**
     * Logout user, delete all localStorage informations.
     * And send to server to delete all
     */
    logout(): void {
        const cacheController = new CacheController();
        const authCacheString = cacheController.searchForCache(
            Globals.AUTHENTICATION_CACHE_NAME
        );
        if (authCacheString === null) {
            return;
        }
        const authCache: AccountData = JSON.parse(
            authCacheString
        ) as AccountData;
        const cacheEl: cacheElements = {
            cacheName: Globals.AUTHENTICATION_CACHE_NAME,
            cacheValue: undefined,
            storageType: StorageTypes.localStorage,
        };
        cacheController.removeCache(cacheEl);

        const httpPostRequest = new HttpPostRequest();
        const httpPostRequestConfig: HttpPostRequestType = {
            header: {
                Authorization: `Bearer ${authCache.token}`,
            },
            body: undefined,
            url: "/api/logout",
        };
        httpPostRequest
            .fetchPost(httpPostRequestConfig)
            .then((response) => {
                if (response.isError === "true") {
                    window.alert("Failed To Logout.");
                    return;
                }
                window.location.href = "/";
            })
            .catch((error) => {
                window.alert("Failed to logout.");
                return;
            });
    }
}
