import * as AuthFunction from "@/Functions/AuthenticationFunctions";
import Styles from "../../../css/styles.module.css";
function redirectUrl(URI: string | Location): any { window.location = URI as Location; }
export default function FinalSection() {
    
    if (!AuthFunction.IsAuthenticated()) {
        return (
            <div className={Styles.finalSection}>
                <p onClick={() => redirectUrl('/Login')}>Login</p>
                <hr className={Styles.verticalLine}></hr>
                <p onClick={() => redirectUrl('/Register')}>Register</p>
            </div>
        )
    };
    const AccountData = AuthFunction.getInformations();
    if (AccountData === undefined) {
        return (
            <div className={Styles.finalSection}>
                <p onClick={() => redirectUrl('/Login')}>Login</p>
                <hr className={Styles.verticalLine}></hr>
                <p onClick={() => redirectUrl('/Register')}>Register</p>
            </div>
        );
    };
    return (
        <div className={Styles.finalSection}>
            <p onClick={() => redirectUrl('#')}>{AccountData.full_name}</p>
            <hr className={Styles.verticalLine}></hr>
            <p onClick={() => redirectUrl("#")}>MyAccount</p>
        </div>
    )

};