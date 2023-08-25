import {
    ICache,
    cacheElements,
} from "@/Interface/CacheInterface/CacheInterface";
import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
export default class CacheController implements ICache {
    saveCache(configurations: cacheElements): boolean {
        switch (configurations.storageType) {
            case StorageTypes.localStorage: {
                try {
                    localStorage.setItem(
                        configurations.cacheName,
                        configurations.cacheValue
                    );
                } catch (error) {
                    return false;
                }
                var newCache = localStorage.getItem(configurations.cacheName);
                if (newCache === null) {
                    return false;
                }
                return true;
            };
            case StorageTypes.sessionStorage: {
                try {
                    sessionStorage.setItem(
                        configurations.cacheName,
                        configurations.cacheValue
                    );
                } catch (error) {
                    return false;
                }

                var newCache = sessionStorage.getItem(configurations.cacheName);
                if (newCache === null) {
                    return false;
                }
                return true;
            }

            default:
                return false;
        };
    };
    removeCache(configurations: cacheElements): boolean {
        switch (configurations.storageType) {
            case StorageTypes.localStorage: {
                localStorage.removeItem(configurations.cacheName);
                const cache = localStorage.getItem(configurations.cacheName);
                if (cache !== null) {
                    return false;
                }
                return true;
            }
            case StorageTypes.sessionStorage: {
                sessionStorage.removeItem(configurations.cacheName);
                const cache = sessionStorage.getItem(configurations.cacheName);
                if (cache !== null) {
                    return false;
                }
                return true;
            }
        }
    }
}
