import CacheController from "@/Controllers/Cache/CacheController";
import store from "@/Redux/Store";
import { updateAuth } from "@/Redux/Authentication.redux";

export function IsAuthenticated() {
    const cacheController = new CacheController();
    const cache = cacheController.searchForCache("Authentication");
    if (cache === null) {
        return false;
    }
    return true;
}

export function getInformations() {
    
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
