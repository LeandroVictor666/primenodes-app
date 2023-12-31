import IProductController from "@/Interface/ProductInterface/IProductController";
import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";

import HttpPostRequest from "../HttpClient/HttpPostClient";
import { ProductServerResponse, ServerResponse } from "@/types/serverresponse";
import HttpGetClient from "../HttpClient/HttpGetClient";
import { HttpGetRequestType } from "@/types/HttpRequestType/HttpGetRequestType";
import { Product } from "@/types/product";

export default class ProductController implements IProductController {
    private authorizationToken: string;

    constructor(authorizationToken: string = "") {
        this.authorizationToken = authorizationToken;
    }

    private isValidImage = (blobType: string): boolean => {
        return blobType === "image/jpeg" || blobType === "image/png";
    };

    async fireNewProduct(payload: {
        productName: string;
        productDescription: string;
        productCategory: string;
        productState: string;
        productPrice: number;
        productImage: Blob;
    }): Promise<ServerResponse | undefined> {
        if (payload.productName.length < 3) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response:
                    "The product name field must be at least 3 characters.",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        } else if (payload.productName.length > 255) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response:
                    "The product name field must not be greater than 255 characters.",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        }

        if (payload.productDescription.length < 4) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response:
                    "The product description field must be at least 4 characters.",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        } else if (payload.productDescription.length > 350) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response:
                    "The product description field must not be greater than 350 characters.",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        }

        if (payload.productPrice === 0) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response: "The product value field must be at least 1 (BRL)",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        }

        if (
            payload.productImage === null ||
            payload.productImage === undefined
        ) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response: "Please, select a product image.",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        } else if (!this.isValidImage(payload.productImage.type)) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response: "Please, select a valid image file.",
                mySqlError: "null",
                token: "null",
            };
            return Promise.reject(errorResponse);
        }

        const bodyData = new FormData();
        bodyData.append("name", payload.productName);
        bodyData.append("description", payload.productDescription);
        bodyData.append("category", payload.productCategory);
        bodyData.append("state", payload.productState);
        bodyData.append("price", payload.productPrice.toString());
        bodyData.append(
            "product_image",
            payload.productImage,
            "product_image.jpeg"
        );

        const HttpConfigurations: HttpPostRequestType = {
            url: "/api/product/firenewproduct",
            headers: {
                Authorization: `Bearer ${this.authorizationToken}`,
            },
            body: bodyData,
        };
        var serverResponse;
        const httpPostRequest = new HttpPostRequest();
        await httpPostRequest
            .fetchPost(HttpConfigurations)
            .then((response: ServerResponse) => {
                serverResponse = response;
                console.log(serverResponse);
            })
            .catch((error) => {
                return Promise.reject(error);
            });

        return Promise.resolve(serverResponse);
    }

    async searchProductByProductName(
        productName: string
    ): Promise<ProductServerResponse | undefined> {
        if (productName.length < 3) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response: "The minimum number of characters to search is 3",
                mySqlError: "",
                token: "",
            };
            return Promise.reject(errorResponse);
        }

        const httpConfiguration: HttpGetRequestType = {
            url: `/api/product/searchByName`,
            paramsFormated: productName,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const HttpGetClientController: HttpGetClient = new HttpGetClient();
        var serverResponse: ProductServerResponse | undefined;
        await HttpGetClientController.fetchGet(httpConfiguration)
            .then((response) => {
                serverResponse = response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
        if (serverResponse === undefined) {
            return Promise.reject(undefined);
        }

        return Promise.resolve(serverResponse);
    }

    async searchProductByVendorName(
        vendorName: string
    ): Promise<ProductServerResponse | undefined> {
        if (vendorName.length < 3) {
            const errorResponse: ServerResponse = {
                isError: "true",
                response: "The minimum number of characters to search is 3",
                mySqlError: "",
                token: "",
            };
            return Promise.reject(errorResponse);
        }

        const httpConfiguration: HttpGetRequestType = {
            url: `/api/product/searchByVendorName`,
            paramsFormated: vendorName,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const HttpGetClientController: HttpGetClient = new HttpGetClient();
        var serverResponse: ProductServerResponse | undefined;
        await HttpGetClientController.fetchGet(httpConfiguration)
            .then((response) => {
                serverResponse = response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
        if (serverResponse === undefined) {
            return Promise.reject(undefined);
        }

        return Promise.resolve(serverResponse);
    }
}
