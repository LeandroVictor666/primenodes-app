import { Product } from "@/types/product";
import Styles from "../../../css/styles.module.css";
import { usePage } from "@inertiajs/react";
export const BuyPageUI = () => {
    const productData: Product = usePage().props.productInformations as Product;
    console.log(usePage().props);

    return (
        <div className={Styles.BuyPageUI}>
            <div className={Styles.BuyPageProductDetails}>
                <div className={Styles.ProductDetailsHeader}>
                    <img src={`../assets/images/product-images/product-${productData.id}.jpg`} className={Styles.ProductImage} />
                    <p>{productData.name}</p>
                </div>
                <div className={Styles.horizontalDiv} />
                <div className={Styles.ProductDetailsBody}>
                    <p>Description: <span>{productData.description}</span></p>
                    <p>Category: <span>{productData.category}</span></p>
                    <p>State: <span>{productData.state}</span></p>
                    <p>Release Date: <span>{productData.release_date as string}</span></p>
                    <p>Vendor Name: <span>{productData.vendor_name}</span></p>
                </div>
            </div>

            <div className={Styles.BuyPageMainDetails}>
                <div className={Styles.MainDetailsHeader}>
                    <p>Payment Card</p>
                </div>
                <div className={Styles.MainDetailsBody}>
                    <p>Nome Completo</p>
                    <input type="text" placeholder="ex: Leandro Victor Da Silva.."/>

                    <p>Email</p>
                    <input type="text" placeholder="ex: SeuEmail@dominio.com"/>

                    <p>CPF</p>
                    <input type="text" placeholder="formato: xxx.xxx.xxx-xx"/>

                    <p>Numero Do Cartão</p>
                    <input type="text" placeholder="Pelo amor de cristo, não coloque nada real aqui" style={{ width: '95%' }} />

                    <p>CVV</p>
                    <input type="text" style={{ width: '30%' }} placeholder="xxx"/>

                    <p>Validade</p>
                    <input type="date" style={{ width: '40%', marginTop: '10px' }} />

                    <p style={{marginBottom:'5%'}}>Total: {productData.price}R$</p>
                </div>
            </div>

            <div className={Styles.BuyControls}>
                <button>
                    Confirm Payment
                </button>
                <button>
                    Cancel
                </button>
            </div>


        </div>
    )

}