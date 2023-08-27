import { IHttpPutRequest } from "@/Interface/HttpClientRequest/HttpPutRequest/IHttpPutRequest";
import { HttpPutRequestType } from "@/types/HttpRequestType/HttpPutRequestType";

export default class HttpPutClient implements IHttpPutRequest {
    async fetchAPI(settings: HttpPutRequestType): Promise<any> {
        const configurations = {
            method: 'PUT',
            header: settings.header,
            body: settings.body,
        };
        var serverToClient: JSON | undefined;
        await fetch(settings.url, configurations)
            .then((r) => {
                return r.json();
            })
            .then((svResponse) => {
                serverToClient = svResponse;
            })
            .catch((error) => {
                window.alert(`fn Error=> ${error}`);
                return Promise.reject(undefined);
            });

        return Promise.resolve(serverToClient);
    }
}
