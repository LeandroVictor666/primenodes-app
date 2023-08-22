import Styles from "../../css/styles.module.css";
import { ProductObject } from "../../types/product"

export default function ProductCard({ ProductObject }) {
    return (
        <div className={Styles.itemCard}>
            <div className={Styles.itemCardHeader}>
                <img src={ProductImage} alt="" className={Styles.productImage} />
                <p>Processador Intel Core i7-12700K, 3.6GHz (5.0GHz Max Turbo), 12 Núcleos, 20 Threads, LGA 1700, Vídeo Integrado - BX8071512700K</p>
                <hr className={Styles.horizontalLine}></hr>
            </div>
            <div className={Styles.itemCardInformationContainer}>
                <p><strong>Descrição:</strong> {ProductObject.Description}</p>
                <p><strong>Categoria:</strong> {ProductObject.Category}</p>
                <p><strong>Estado:</strong> {ProductObject.State}</p>
                <p><strong>Nome.Vendedor:</strong> {ProductObject.VendorName}</p>
                <p><strong>Preço:</strong> R$ {ProductObject.Price}</p>
                <p><strong>Data De Venda:</strong> {ProductObject.SellDate}</p>
            </div>
        </div>
    )

}