// import * as AuthFunctions from "@/Functions/AuthenticationFunctions";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import HomePageUI from "@/Pages/HomePage/HomePageUI";
// import RegisterUI from "@/Pages/RegisterPage/RegisterUI";
// import LoginUI from "@/Pages/LoginPage/LoginUI";
// import * as React from "react";

// const allRoutes = () => {
//     return (
//         <>
//             <Route path="/" element={<HomePageUI />}></Route>
//             <Route path="/Register" element={<RegisterUI/>}></Route>
//             <Route path="/Login" element={<LoginUI renderModal={renderModal} />}></Route>
//         </>
//     )
// };

// export default function Routes({ renderModal }: { renderModal: React.Dispatch<React.SetStateAction<{ isActive: boolean; title: string; content: string; modalType: string }>>}) {
//     if (!AuthFunctions.IsAuthenticated()) {
//         <>
//             {allRoutes(renderModal)}
//         </>
//     }
// }
// //<Route path="/" element={<HomePageUI />}></Route>
