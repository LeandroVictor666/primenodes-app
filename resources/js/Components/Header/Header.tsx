import React, { useContext } from "react";
import FirtSection from "./FirstSection";
import MiddleSection from "./MiddleSection";
import FinalSection from "./FinalSection";
export default function Header(){

    return (
        <header>
            <FirtSection/>
            <MiddleSection/>
            <FinalSection/>
        </header>

    )
}