import { MouseEventHandler } from "react";
import Styles from "../../../css/styles.module.css";
export default function FinalSection() {
    function redirectUrl(URI: string | Location): any { window.location = URI as Location; }
    return (
        <div className={Styles.finalSection}>
            <p onClick={() => redirectUrl('/Login')}>Login</p>
            <hr className={Styles.verticalLine}></hr>
            <p onClick={() => redirectUrl('/Register')}>Register</p>
        </div>
    )
};