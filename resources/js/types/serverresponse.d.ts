import { Product } from "./product";

export class ServerResponse {
    response: string;
    isError: string;
    mySqlError: string;
    token: string;
}

export class ProductServerResponse {
    response:string;
    isError:string;
    Products: Array<Product>;
}
