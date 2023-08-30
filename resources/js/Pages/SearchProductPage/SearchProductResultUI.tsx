import { Product } from "@/types/product";
import Styles from "../../../css/styles.module.css";
export const SearchProductResultUI = ({ product }: { product: Product }) => {

    return (
        <div className={Styles.ProductCard} onClick={() => { window.open(`/product/${product.id}`, '_blank') }}>
            <div className={Styles.ProductCardHeader}>
                <img className={Styles.ProductImage} src={`../assets/images/product-images/product-${product.id}.jpg`} alt="" />
            </div>
            <div className={Styles.ProductCardBody}>
                <p className={Styles.BigLabel}>Product Name</p>
                <p>{product.name}</p>
                <p className={Styles.BigLabel}>Product Description</p>
                <p>{product.description}</p>
                <p className={Styles.BigLabel}>Product Category</p>
                <p>{product.category}</p>
                <p className={Styles.BigLabel}>Product State</p>
                <p>{product.state}</p>
                <p className={Styles.BigLabel}>Vendor Name</p>
                <p>{product.vendor_name}</p>
            </div>
        </div>

    )

}