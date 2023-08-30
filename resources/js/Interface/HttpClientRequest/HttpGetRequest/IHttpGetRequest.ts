import { HttpGetRequestType } from "@/types/HttpRequestType/HttpGetRequestType";
export interface IHttpGetRequest {
    fetchGet(settings: HttpGetRequestType): Promise<any | undefined>;
}
