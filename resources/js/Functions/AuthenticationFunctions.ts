import CacheController from "@/Controllers/Cache/CacheController";
export function IsAuthenticated()
{
    const cacheController = new CacheController();
    const cache = cacheController.searchForCache("Authentication");
    if (cache === null){
        return false;
    }
    return true;
}