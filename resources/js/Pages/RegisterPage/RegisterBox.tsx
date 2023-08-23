import { useState } from "react";
import Style from "../../../css/styles.module.css";
import { render } from "react-dom";
export default function RegisterBox() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(Date());

    function renderusernameInput() {
        if (username.length > 3 && username.length < 35) {
            return (
                <input type="text" style={{ borderColor: "#32CD32" }} onChange={(e) => { setUsername(e.target.value); }} placeholder="Input your username, ex: itzLeandro666" name="username" value={username} ></input>
            );
        } else if (username.length == 0) {
            return (
                <input value={username} type="text" placeholder="UserName ex: itzLeandro" onChange={(e) => setUsername(e.target.value)}></input>
            );
        } else {
            return (
                <input type="text" style={{ borderColor: "#FF0000" }} onChange={(e) => { setUsername(e.target.value); }} placeholder="Input your username, ex: itzLeandro666" name="username" value={username}></input>
            );
        }
    }
    function renderFullNameBox() {
        if (fullName.length > 3 && fullName.length < 35) {
            return (
                <input value={fullName} type="text" style={{ borderColor: "#32CD32" }} onChange={(e) => { setFullName(e.target.value); }} placeholder="Input your FullName, ex: Leandro Victor" name="full_name" ></input>
            );
        } else if (fullName.length == 0) {
            return (
                <input value={fullName} type="text" placeholder="Input your FullName, ex: Leandro Victor" onChange={(e) => setFullName(e.target.value)}></input>
            );
        } else {
            return (
                <input value={fullName} type="text" style={{ borderColor: "#FF0000" }} onChange={(e) => { setFullName(e.target.value); }} placeholder="Input your FullName, ex: Leandro Victor" name="full_name"></input>
            );
        }
    }
    function renderEmailInput() {
        if (email.length > 3 && email.length < 35) {
            return (
                <input value={email} type="text" style={{ borderColor: "#32CD32" }} onChange={(e) => { setEmail(e.target.value); }} placeholder="Input your Email, ex: myEmail@email.com" name="email"></input>
            );
        } else if (email.length == 0) {
            return (
                <input value={email} type="text" placeholder="Input your Email, ex: myEmail@email.com" onChange={(e) => setEmail(e.target.value)}></input>
            );
        } else {
            return (
                <input value={email} type="text" style={{ borderColor: "#FF0000" }} onChange={(e) => { setEmail(e.target.value); }} placeholder="Input your Email, ex: myEmail@email.com" name="email"></input>
            );
        }
    }

    function renderPasswordInput() {
        if (password.length > 3 && password.length < 35) {
            return (
                <input value={password} type="password" style={{ borderColor: "#32CD32" }} onChange={(e) => { setPassword(e.target.value); }} placeholder="Input your Email, ex: myEmail@email.com" name="email"></input>
            );
        } else if (password.length == 0) {
            return (
                <input value={password} type="password" placeholder="Input your Email, ex: myEmail@email.com" onChange={(e) => setPassword(e.target.value)}></input>
            );
        } else {
            return (
                <input value={password} type="password" style={{ borderColor: "#FF0000" }} onChange={(e) => { setPassword(e.target.value); }} placeholder="Input your Email, ex: myEmail@email.com" name="email"></input>
            );
        }
    };
    return (
        <div className={Style.RegisterBoxContainer}>
            <div className={Style.Header}>
                <p>Register</p>
            </div>
            <form className={Style.formContainer}>
                {renderusernameInput()}
                {renderFullNameBox()}
                {renderEmailInput()}
                {renderPasswordInput()}
                <input type="date" onChange={(e) => { setDateOfBirth(e.target.value); }} name="dateOfBirth" value={dateOfBirth} ></input>
                <input type="submit" value={"Register"}></input>
            </form>
        </div>
    );
}
