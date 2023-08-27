import * as AuthFunction from "@/Functions/AuthenticationFunctions";
import Styles from "../../../css/styles.module.css";
import LoginController from "@/Controllers/Login/LoginController";
function redirectUrl(URI: string | Location): any { window.location = URI as Location; }

function logoutUser(): void {
    var loginController = new LoginController();
    loginController.logout();
    return;
};

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
            <p onClick={() => redirectUrl("/MyAccount")}>MyAccount</p>
            <hr className={Styles.verticalLine}></hr>
            <p onClick={() => logoutUser()}>Logout</p>
        </div>
    )

};