import Styles from "../../../css/styles.module.css";
export const FullProductHeaderUI = ({ productId, productName }: { productId: string | undefined, productName: string }) => {
    return (
        <div className={Styles.FullProductHeaderUI}>
            <img src={`../assets/images/product-images/product-${productId}.jpg`} className={Styles.ProductImage} onClick={() => window.open(`../assets/images/product-images/product-${productId}.jpg`, '_blank')} />
            <p>{productName}</p>
        </div>
    );
};