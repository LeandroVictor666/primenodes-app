import Styles from "../../../css/styles.module.css";
// import ProductImage from "../../../images/product-1.jpg";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className={`${Styles.itemCard}`}>
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
                <button>Buy</button>
                <button>Contact Author</button>

            </div>
        </div>
    );
};