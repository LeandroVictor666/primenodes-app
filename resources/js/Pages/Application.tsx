// import React, { useEffect, useState } from "react";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PropBase } from "@/types/propbase";
import HomePageUI from "./HomePage/HomePageUI";
import RegisterUI from "./RegisterPage/RegisterUI";
import Header from "@/Components/Header/Header";
import LoginUI from "./LoginPage/LoginUI";
import ModalUI from "@/Components/ModalUI/ModalUI";
import { Provider } from "react-redux";
import store from "@/Redux/Store";
import * as AuthFunction from "@/Functions/AuthenticationFunctions";
export default function App({ propBase }: { propBase: PropBase }) {
    const [modalinterface, setModalState] = React.useState({ isActive: false, title: '', content: '', modalType: '' });

    console.log(`antes -> ${store.getState().AuthenticationRedux?.full_name}`)
    AuthFunction.updateAuthState("meuEmail@gmail.com", "meuNome", "meuToken");
    console.log(`depois -> ${store.getState().AuthenticationRedux?.full_name}`)

    return (
        <React.StrictMode>
            <Provider store={store}>
                <Header />
                <ModalUI renderModal={setModalState} modalInterface={modalinterface} />
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePageUI />}></Route>
                        <Route path="/Register" element={<RegisterUI renderModal={setModalState} />}></Route>
                        <Route path="/Login" element={<LoginUI renderModal={setModalState} />}></Route>
                    </Routes>
                </Router>
            </Provider>
        </React.StrictMode>
    )
};