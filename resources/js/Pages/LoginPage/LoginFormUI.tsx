
import Styles from "../../../css/styles.module.css";
export default function LoginFormUI() {

    return (
        <form className={Styles.LoginFormDiv}>
            <div className={Styles.Header}>
                <p>Authenticate</p>

            </div>

            <input type="text" placeholder="Username../"></input>
            <input type="password" placeholder="Password../"></input>
            <input type="submit" name="login" value={'Login'}></input>
            <input type="submit" id="id_forgot_password" name="forgot_password" value="Forgot your password?"></input>
        </form>
    )

}