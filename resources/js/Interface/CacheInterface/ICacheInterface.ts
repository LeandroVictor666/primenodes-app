import { StorageTypes } from "@/Enums/StorageTypes/StorageTypes";
export type cacheElements = {
    cacheName: string;
    cacheValue: any;
    storageType: StorageTypes;
};

export interface ICache {
    saveCache(configurations: cacheElements): boolean;
    removeCache(configurations: cacheElements): boolean;
    searchForCache(nameToSearch:string) :string | null;
}
