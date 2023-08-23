import Styles from "../../../css/styles.module.css";
import ProductImage from "../../../images/product-1.jpg";
import { Product } from "@/types/product";

export default function ProductCard({product}: {product:Product}) {
    return (
        <div className={`${Styles.itemCard}`}>
            <div className={Styles.itemCardHeader}>
                <img src={ProductImage} className={Styles.productImage} />
                <p>Processador Intel Core i7-12700K, 3.6GHz (5.0GHz Max Turbo), 12 Núcleos, 20 Threads, LGA 1700, Vídeo Integrado - BX8071512700K</p>
                <hr className={Styles.horizontalLine}></hr>
            </div>
            <div className={Styles.itemCardInformationContainer}>
                <p><strong>Descrição:</strong> {product.description}</p>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Estado:</strong> {product.state}</p>
                <p><strong>Nome.Vendedor:</strong> {product.vendor_name}</p>
                <p><strong>Preço:</strong> R$ {product.price}</p>
            </div>
        </div>
    );
};