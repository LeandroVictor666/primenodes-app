import Styles from "../../../css/styles.module.css";
import { BiLogoGithub } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";
export default function MiddleSection() {
    function redirectUrl(URI: string | Location): any { window.location = URI as Location; }
    return (
        <div className={Styles.middleSection}>
            <span onClick={() => { window.open("https://github.com/LeandroVictor666", '_blank') }}>
                {<BiLogoGithub className={Styles.icons}></BiLogoGithub>}
            </span>
            <span onClick={() => { window.open("https://www.linkedin.com/in/leandro-victor-da-silva-vilela-7654a326a/", '_blank') }}>
                {<BsLinkedin className={Styles.icons}></BsLinkedin>}
            </span>
        </div>
    )
};