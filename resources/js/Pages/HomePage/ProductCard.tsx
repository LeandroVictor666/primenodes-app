import Styles from "../../../css/styles.module.css";
// import ProductImage from "../../../images/product-1.jpg";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
    console.log(product);

    return (
        <div className={`${Styles.itemCard}`} onClick={() => { window.open(`/product/${product.id}`, '_blank') }}>
            <div className={Styles.itemCardHeader}>
                <img src={`assets/images/product-images/product-${product.id}.jpg`} className={Styles.productImage} />
                <p>{product.name}</p>
                <hr className={Styles.horizontalLine}></hr>
            </div>
            <div className={Styles.itemCardInformationContainer}>
                <p><strong>Descrição:</strong> {product.description}</p>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Estado:</strong> {product.state}</p>
                <p><strong>Nome.Vendedor:</strong> {product.vendor_name}</p>
                <p><strong>Preço:</strong> R$ {product.price}</p>
            </div>
            <div className={Styles.itemCardControls}>
                <button onClick={() => { window.open(`/buy-product/${product.id}`, "_blank") }}>Buy</button>
                <button>Contact Author</button>

            </div>
        </div>
    );
};