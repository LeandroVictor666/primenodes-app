import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PropBase } from "@/types/propbase";

import HomePageUI from "./HomePage/HomePageUI";
import RegisterUI from "./RegisterPage/RegisterUI";
import Header from "@/Components/Header/Header";
import LoginUI from "./LoginPage/LoginUI";
//Ficaria muito mais desorganizado e extenso não usar a lib "react-router-dom", antes eu havia tentando implementar através das props, o server enviaria a rota atual dentro de uma prop para nossa Application, a application interpretaria e renderizaria a pagina certa.
//Porém, acabou que o codigo ia ficar um pouco grande e mais extenso, então usei sem dó xD

export default function App({propBase}:{propBase:PropBase}){
    return (
        <React.StrictMode>
            <Header/>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePageUI/>}></Route>
                    <Route path="/Register" element={<RegisterUI/>}></Route>
                    <Route path="/Login" element={<LoginUI/>}></Route>
                </Routes>
            </Router>
        </React.StrictMode>
        )};