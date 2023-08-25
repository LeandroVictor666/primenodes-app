// import React, { useEffect, useState } from "react";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PropBase } from "@/types/propbase";
import HomePageUI from "./HomePage/HomePageUI";
import RegisterUI from "./RegisterPage/RegisterUI";
import Header from "@/Components/Header/Header";
import LoginUI from "./LoginPage/LoginUI";
import ModalUI from "@/Components/ModalUI/ModalUI";
import {useEffect} from "react";
export default function App({ propBase }: { propBase: PropBase }) {
    useEffect(()=> {
        console.log("opa");
    }, []);
    


    
    const [modalinterface, setModalState] = React.useState({ isActive: false, title: '', content: '', modalType: '' });
    return (
        <React.StrictMode>
            <Header />
            <ModalUI renderModal={setModalState} modalInterface={modalinterface} />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePageUI />}></Route>
                    <Route path="/Register" element={<RegisterUI renderModal={setModalState} />}></Route>
                    <Route path="/Login" element={<LoginUI renderModal={setModalState} />}></Route>
                </Routes>
            </Router>
        </React.StrictMode>
    )
};