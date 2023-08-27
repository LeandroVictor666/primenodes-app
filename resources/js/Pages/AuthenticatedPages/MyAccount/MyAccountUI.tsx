import { usePage } from "@inertiajs/react";

interface AccountProps {
    id: number;
    username: string;
    full_name: string;
    email: string;
    email_status: string;
    date_of_birth: string;
    token: string;
};


export const MyAccountUI = () => {
    const userAccount: AccountProps = usePage().props.AccountInformations as AccountProps;
    return (
        <>
            <p>This is MyAccount-Authenticated Route!</p>
            <br></br>
            <p>ID = {userAccount.id}</p>
            <br></br>
            <p>Username = {userAccount.username}</p>
            <br></br>
            <p>Name = {userAccount.full_name}</p>
            <br></br>
            <p>Email = {userAccount.email}</p>
            <br></br>
            <p>Email Status = {userAccount.email_status}</p>
            <br></br>
            <p>Date Of Birthday: {userAccount.date_of_birth}</p>
            <br></br>
            <p>Secret Token: {userAccount.token}</p>
            <br></br>
            <small>Se você esta lendo isso aqui, saiba que isso é só um teste, obviamente isso não ira para a versão final.</small>
        </>
    )

}