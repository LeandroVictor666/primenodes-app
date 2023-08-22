import Styles from "../../../css/styles.module.css";
import { BiLogoGithub } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";
export default function MiddleSection() {
    return (
        <div className={Styles.middleSection}>
            {<BiLogoGithub className={Styles.icons}></BiLogoGithub>}
            {<BsLinkedin className={Styles.icons}></BsLinkedin>}
        </div>
    )
};