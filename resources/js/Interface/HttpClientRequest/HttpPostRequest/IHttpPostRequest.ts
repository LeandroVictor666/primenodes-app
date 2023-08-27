import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";

export interface IHttpPostRequest {
    fetchPost(settings: HttpPostRequestType): Promise<any | undefined>;

}
