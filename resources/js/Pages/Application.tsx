//#region  Imports
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PropBase } from "@/types/propbase";
import HomePageUI from "./HomePage/HomePageUI";
import RegisterUI from "./RegisterPage/RegisterUI";
import Header from "@/Components/Header/Header";
import LoginUI from "./LoginPage/LoginUI";
import ModalUI from "@/Components/ModalUI/ModalUI";
import * as ReactRedux from "react-redux";
import store from "@/Redux/Store";
import { MyAccountUI } from "./AuthenticatedPages/MyAccount/MyAccountUI";
import { usePage } from "@inertiajs/react";
import { AuthRoutes } from "@/Routes/Routes";
import { SearchProductUI } from "./SearchProductPage/SearchProductUI";
import { FullProductUI } from "./ViewFullProductPage/FullProductUI";
//#endregion

export default function App({ propBase }: { propBase: PropBase }) {
    return (
        <React.StrictMode>
            <ReactRedux.Provider store={store}>
                <Header />
                <ModalUI/>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePageUI />}></Route>
                        <Route path="/Register" element={<RegisterUI/>}></Route>
                        <Route path="/Login" element={<LoginUI/>}></Route>
                        <Route path="/product/searchproduct" element={<SearchProductUI/>}></Route>
                        <Route path="/product/:productId" element={<FullProductUI/>}></Route>
                        {AuthRoutes()}
                        
                    </Routes>
                </Router>
            </ReactRedux.Provider>
        </React.StrictMode>
    )
};