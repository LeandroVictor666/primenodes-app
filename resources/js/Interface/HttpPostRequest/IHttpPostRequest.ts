import { HttpPostRequestType } from "@/types/HttpPostRequestType/HttpPostRequestType";

export interface IHttpPostRequest {
    fetchPost(settings: HttpPostRequestType): Promise<any | undefined>;

}
