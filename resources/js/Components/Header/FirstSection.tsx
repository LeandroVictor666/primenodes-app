import Styles from "../../../css/styles.module.css";
export default function FirtSection() {
    function redirectUrl(URI: string | Location): any { window.location = URI as Location; }
    return (
        <div className={Styles.firstSection}>
            <p onClick={()=> redirectUrl("/")}>PrimeNodes-Project</p>
        </div>
    )
};