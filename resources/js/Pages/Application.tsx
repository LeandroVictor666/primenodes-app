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
//#endregion

export default function App({ propBase }: { propBase: PropBase }) {
    // console.group("inertiaJs");
    // console.log("usePage: ", usePage().props.AccountInformations);
    // console.groupEnd();
    

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
                        <Route path="/MyAccount" element={<MyAccountUI/>}></Route>
                    </Routes>
                </Router>
            </ReactRedux.Provider>
        </React.StrictMode>
    )
};