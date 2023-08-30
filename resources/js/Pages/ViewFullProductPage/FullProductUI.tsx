import { useParams } from "react-router-dom";
import { usePage } from "@inertiajs/react";
import Styles from "../../../css/styles.module.css";
import { Product } from "@/types/product";
import { FullProductHeaderUI } from "./FullProductHeaderUI";
import { FullProductBodyUI } from "./FullProductBodyUI";
export const FullProductUI = () => {
    const productData = usePage().props['productData'] as Product;
    const urlParams = useParams();
    return (
        <div className={Styles.FullProductUI}>
            <FullProductHeaderUI productId={urlParams['productId']} productName={productData.name} />
            <FullProductBodyUI productData={productData}/>
        </div>
    );
};