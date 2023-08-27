import { HttpPutRequestType } from "@/types/HttpRequestType/HttpPutRequestType";

export interface IHttpPutRequest {
    fetchAPI(settings: HttpPutRequestType): Promise<any | undefined>;

}
