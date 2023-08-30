import { Product } from "@/types/product"
import Styles from "../../../css/styles.module.css";
export const FullProductBodyUI = ({ productData }: { productData: Product }) => {
    return (
        <div className={Styles.FullProductBodyUI}>
            <p className={Styles.BigLabel}>Description</p>
            <p>{productData.description}</p>
            <hr className={Styles.horizontalDiv} />

            <p className={Styles.BigLabel}>Category</p>
            <p>{productData.category}</p>
            <hr className={Styles.horizontalDiv} />

            <p className={Styles.BigLabel}>State</p>
            <p>{productData.state}</p>
            <hr className={Styles.horizontalDiv} />

            <p className={Styles.BigLabel}>Vendor Name</p>
            <p>{productData.vendor_name}</p>
            <hr className={Styles.horizontalDiv} />

            <p className={Styles.BigLabel}>Price</p>
            <p>{productData.price}R$</p>
            <hr className={Styles.horizontalDiv} />

            <p className={Styles.BigLabel}>Release Date</p>
            <p>{productData.release_date as string}</p>
            <hr className={Styles.horizontalDiv} />
            <div className={Styles.FullProductFinalBody}>
                <button>
                    Buy
                </button>
                <button>
                    Contact Author
                </button>
                <button>
                    Report Product
                </button>
            </div>
        </div>
    );
};