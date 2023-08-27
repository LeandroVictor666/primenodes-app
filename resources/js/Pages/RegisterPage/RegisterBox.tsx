import { useState } from "react";
import Style from "../../../css/styles.module.css";
import { ServerResponse } from "@/types/serverresponse";
import HttpPostRequest from "@/Controllers/HttpClient/HttpPostClient";
import { HttpPostRequestType } from "@/types/HttpRequestType/HttpPostRequestType";
import * as ReactRedux from "react-redux";
import { showModal, ModalType } from "@/Redux/Modal.Redux";
import IModal from "@/Interface/ModalInterface/ModalInterface";



export default function RegisterBox() {

    const dispatch = ReactRedux.useDispatch();
    const registerEvent = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        if (!validateInput(username, 3, 35)) {
            const payload: IModal = {
                title: 'Registration Failed',
                content: 'The minimum amount of characters for Username is 3, and the maximum is 35',
                modalType: ModalType.failure,
                isActive: true
            };
            dispatch(showModal(payload));
            return;
        } else if (!validateInput(fullName, 3, 170)) {
            const payload: IModal = {
                title: 'Registration Failed',
                content: 'The minimum amount of characters for Full Name is 3, and the maximum is 170',
                modalType: ModalType.failure,
                isActive: true
            };
            dispatch(showModal(payload));
            return;
        } else if (!validateInput(email, 3, 255)) {
            const payload: IModal = {
                title: 'Registration Failed',
                content: 'The minimum amount of characters for Email is 3, and the maximum is 255',
                modalType: ModalType.failure,
                isActive: true
            };
            dispatch(showModal(payload));
            return;
        } else if (!validateInput(password, 3, 255)) {
            const payload: IModal = {
                title: 'Registration Failed',
                content: 'The minimum amount of characters for Password is 3, and the maximum is 255',
                modalType: ModalType.failure,
                isActive: true
            };
            dispatch(showModal(payload));
            return;
        }
        var bodyData = new FormData();
        bodyData.append("username", username);
        bodyData.append("full_name", fullName);
        bodyData.append("email", email);
        bodyData.append("password", password);
        bodyData.append("date_of_birth", dateOfBirth);

        var HttpPostClient = new HttpPostRequest();
        var configurations: HttpPostRequestType = {
            url: '/api/register',
            header: {
                "Content-Type": "application/json"
            },
            body: bodyData
        };
        var serverResponse: RegisterModel | undefined;
        await HttpPostClient.fetchPost(configurations)
            .then(r => {
                serverResponse = r;
            })
            .catch(error => {
                const payload: IModal = { title: 'API Connection Error', content: 'API Connection error, wait some minutes and try again.', modalType: ModalType.failure, isActive: true };
                dispatch(showModal(payload));
                return;
            });

        if (serverResponse == undefined) {
            const payload: IModal = { title: 'API Connection Error', content: 'API Connection error, wait some minutes and try again.', modalType: ModalType.failure, isActive: true };
            dispatch(showModal(payload));
            return;
        }
        if (serverResponse.isError == 'true') {
            const payload: IModal = { title: 'Registration Failed', content: serverResponse.response, modalType: ModalType.failure, isActive: true };
            dispatch(showModal(payload));
            return;
        } else {
            const payload: IModal = { title: 'Registration Success!', content: serverResponse.response, modalType: ModalType.success, isActive: true };
            dispatch(showModal(payload));
            return;
        };
    }

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(Date());

    function validateInput(input: string, min: number, max: number): boolean {
        if (input.length > min && input.length < max) {
            return true;
        }

        return false;
    }

    function renderusernameInput() {
        if (validateInput(username, 3, 35)) {
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
        if (validateInput(fullName, 3, 170)) {
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
        if (validateInput(email, 3, 255)) {
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
        if (validateInput(password, 4, 255)) {
            return (
                <input value={password} type="password" style={{ borderColor: "#32CD32" }} onChange={(e) => { setPassword(e.target.value); }} placeholder="Input your Password, its secret!" name="password"></input>
            );
        } else if (password.length == 0) {
            return (
                <input value={password} type="password" placeholder="Input your Password, its secret!" onChange={(e) => setPassword(e.target.value)}></input>
            );
        } else {
            return (
                <input value={password} type="password" style={{ borderColor: "#FF0000" }} onChange={(e) => { setPassword(e.target.value); }} placeholder="Input your Password, its secret!" name="password"></input>
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
                <p>Enter your date of birth.</p>
                <input type="date" onChange={(e) => { setDateOfBirth(e.target.value); }} name="date_of_birth" value={dateOfBirth} ></input>
                <input type="submit" onClick={(e) => { registerEvent(e) }} value={"Register"}></input>
            </form>
        </div>
    );
}
