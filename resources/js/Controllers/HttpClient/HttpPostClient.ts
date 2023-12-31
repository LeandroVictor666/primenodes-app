import { IHttpPostRequest } from "@/Interface/HttpClientRequest/HttpPostRequest/IHttpPostRequest";
import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";

export default class HttpPostRequest implements IHttpPostRequest {
    async fetchPost(settings: HttpPostRequestType): Promise<any | undefined> {
        const configurations = {
            method: 'POST',
            headers: settings.headers,
            body: settings.body,
        };
        var serverToClient: JSON | undefined;
        await fetch(settings.url, configurations as RequestInit)
            .then((r) => {
                return r.json();
            })
            .then((svResponse) => {
                serverToClient = svResponse;
            })
            .catch((error) => {
                return Promise.reject(undefined);
            });


        return Promise.resolve(serverToClient);
    }
}
