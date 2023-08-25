import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
export type cacheElements = {
    cacheName: string;
    cacheValue: string;
    storageType: StorageTypes;
};

export interface ICache {
    saveCache(configurations: cacheElements): boolean;
    removeCache(configurations: cacheElements): boolean;
}
