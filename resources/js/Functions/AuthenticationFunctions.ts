import CacheController from "@/Controllers/Cache/CacheController";
import store from "@/Redux/Store";
import { updateAuth } from "@/Redux/Authentication.redux";
import { AUTHENTICATION_CACHE_NAME } from "@/_GLOBALS/_GLOBALS";
import { AccountData } from "@/types/Account/AccountData";

export function IsAuthenticated() {
    const cacheController = new CacheController();
    const cache = cacheController.searchForCache(AUTHENTICATION_CACHE_NAME);
    if (cache === null) {
        return false;
    }
    return true;
}

export function getInformations() :AccountData | undefined
 {
    if (!IsAuthenticated()){
        return undefined;
    }
    const cacheController = new CacheController();
    const cache = cacheController.searchForCache(AUTHENTICATION_CACHE_NAME);
    if (cache === null){
        return undefined;
    }
    return JSON.parse(cache);
}

export function updateAuthState(
    nemail: string,
    fullName: string,
    token: string
) {
    store.dispatch({
        type: updateAuth().type,
        payload: { email: nemail, full_name: fullName, token: token },
    });
}
