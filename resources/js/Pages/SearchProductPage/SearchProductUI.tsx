import { Product } from "@/types/product";
import Styles from "../../../css/styles.module.css";
import * as React from "react";
import { useParams } from "react-router-dom";
import ProductController from "@/Controllers/Product/ProductController";
import { SearchProductResultUI } from "./SearchProductResultUI";
export const SearchProductUI = () => {
    const [products, setProduct] = React.useState<Array<Product> | undefined>(undefined);
    const [filter, setFilter] = React.useState<string>('');
    const [searchType, setSearchType] = React.useState<string>('searchByName');
    function searchForProductsByName() {
        const productController = new ProductController();
        productController.searchProductByProductName(filter)
            .then(response => {
                setProduct(response?.Products);
            })
            .catch(error => {
                console.log(error);
                return;
            });

        return;
    };
    function searchProductByVendorName() {

        const productController = new ProductController();
        productController.searchProductByVendorName(filter)
            .then(response => {
                setProduct(response?.Products);
            })
            .catch(error => {
                console.log(error);
                return;
            });
        return;
    }


    const searchEvent = () => {
        if (searchType === "searchByProductName") {
            searchForProductsByName();
            return;
        } else if (searchType === "searchByVendorName") {
            searchProductByVendorName();
            return;
        } else {
            window.alert("Please, Select A Search Type.");
            return;
        };
    };

    const handleFilter = (element: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(element.target.value);
        return;
    };
    const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value);
        return;
    };

    return (

        <div className={Styles.SearchProductUI}>
            <div className={Styles.SearchProductHeader}>
                <p>Put the name of the product</p>
                <div className={Styles.SearchRadioDiv}>
                    <p>Select By Product Name</p>
                    <input type="radio" name="searchType" id="searchByProductName" value="searchByProductName" onChange={(e) => handleRadio(e)} />
                    <p>Select By Vendor Name</p>
                    <input type="radio" name="searchType" id="searchByVendorName" value="searchByVendorName" onChange={(e) => handleRadio(e)} />
                </div>
                <input type="text" value={filter} onChange={(e) => handleFilter(e)} placeholder="input filter.." autoComplete="off" />
                <button onClick={() => searchEvent()/*searchForProductsByName()*/}>Search</button>
            </div>
            <div className={Styles.SearchProductResults}>
                {products?.map((element, index: number) => {
                    return (
                        <SearchProductResultUI product={element}></SearchProductResultUI>
                    );
                })}

            </div>


        </div>
    )
}