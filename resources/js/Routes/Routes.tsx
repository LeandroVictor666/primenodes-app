import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePageUI from "@/Pages/HomePage/HomePageUI";
import RegisterUI from "@/Pages/RegisterPage/RegisterUI";
import LoginUI from "@/Pages/LoginPage/LoginUI";
import { IsAuthenticated } from "@/Functions/AuthenticationFunctions";

const allRoutes = () => {
    return (
        <>
            <Route path="/" element={<HomePageUI />}></Route>
            <Route path="/Register" element={<RegisterUI />}></Route>
            <Route path="/Login" element={<LoginUI />}></Route>
        </>
    )
};


export const Routes = () => {
    if (IsAuthenticated()) {

        return (
            <>
                <Route path="/MyAccount" element={<LoginUI />}></Route>
            </>
        )


    }

}