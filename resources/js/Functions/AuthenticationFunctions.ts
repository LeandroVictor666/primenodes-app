import CacheController from "@/Controllers/Cache/CacheController";
import { updateAuth } from "@/Redux/Authentication.Redux";
import { AUTHENTICATION_CACHE_NAME } from "@/_GLOBALS/_GLOBALS";
import { AccountData } from "@/types/Account/AccountData";
import * as ReactRedux from "react-redux";

export function IsAuthenticated() {
    const cacheController = new CacheController();
    const cache = cacheController.searchForCache(AUTHENTICATION_CACHE_NAME);
    if (cache === null) {
        return false;
    }
    return true;
}

export function getInformations(): AccountData | undefined {
    if (!IsAuthenticated()) {
        return undefined;
    }
    const cacheController = new CacheController();
    const cache = cacheController.searchForCache(AUTHENTICATION_CACHE_NAME);
    if (cache === null) {
        return undefined;
    }
    return JSON.parse(cache);
}

export function updateAuthState(
    email: string,
    fullName: string,
    token: string
) {
    const Dispatch = ReactRedux.useDispatch();
    const Payload = {
        email: email,
        fullName: fullName,
        token: token,
    };
    
    return;
}
