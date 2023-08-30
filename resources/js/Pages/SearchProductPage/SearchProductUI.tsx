import Styles from "../../../css/styles.module.css";
import { useParams } from "react-router-dom";
export const SearchProductUI = () => {


    return (
        <>
            <div className={Styles.SearchProductUI}>
                <div className={Styles.SearchProductHeader}>
                    <p>Put the name of the product</p>
                    <div className={Styles.SearchRadioDiv}>
                        <p>Select By Product Name</p>
                        <input type="radio" name="searchType" id="searchByName" value="searchByName" checked={true} />
                        <p>Select By Vendor Name</p>
                        <input type="radio" name="searchType" id="searchByVendorName" value="searchByVendorName" />
                    </div>
                    <input type="text" placeholder="input filter.." autoComplete="off" />
                    <button>Search</button>
                </div>
            </div>

        </>
    )
}