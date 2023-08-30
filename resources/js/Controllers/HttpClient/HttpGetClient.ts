import { IHttpGetRequest } from "@/Interface/HttpClientRequest/HttpGetRequest/IHttpGetRequest";
import { HttpGetRequestType } from "@/types/HttpRequestType/HttpGetRequestType";

export default class HttpGetClient implements IHttpGetRequest {


    constructor(){
        return;
    }

    async fetchGet(settings: HttpGetRequestType): Promise<any | undefined> {
        const configurations = {
            method: "GET",
            headers: settings.headers,
        };
        var serverToClient: JSON | undefined;
        await fetch(
            `${settings.url}/${settings.paramsFormated}`,
            configurations as RequestInit
        )
            .then((r) => {
                return r.json();
            })
            .then((svResponse) => {
                serverToClient = svResponse;
            })
            .catch((error) => {
                return Promise.reject(error);
            });

        return Promise.resolve(serverToClient);
    }
}
