import { Product } from "@/types/product";
import { ProductServerResponse, ServerResponse } from "@/types/serverresponse";

export default interface IProductController {
    fireNewProduct(payload: {
        productName: string;
        productDescription: string;
        productCategory: string;
        productState: string;
        productPrice: number;
        productImage: Blob;
    }): Promise<ServerResponse | undefined>;

    searchProductByProductName(
        productName: string
    ): Promise<ProductServerResponse | undefined>;

    searchProductByVendorName(
        productName: string
    ): Promise<ProductServerResponse | undefined>;
}
