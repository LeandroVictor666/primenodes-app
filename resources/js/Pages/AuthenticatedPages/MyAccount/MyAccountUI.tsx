import { usePage } from "@inertiajs/react";
import Styles from "../../../../css/styles.module.css";
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
            <div className={Styles.MyAccountContainer}>
                <div className={Styles.MyAccountHeader}>
                    <img className={Styles.MyAccountPfp} src="https://avatars.githubusercontent.com/u/141360333?v=4" alt="" />
                    <p>{userAccount.full_name}</p>
                </div>
                <div className={Styles.MyAccountInformationsContainer}>
                    <p>This is MyAccount-Authenticated Route!</p>
                    <p>ID = {userAccount.id}</p>
                    <p>Username = {userAccount.username}</p>
                    <p>Email = {userAccount.email}</p>
                    <p>Email Status = {userAccount.email_status}</p>
                    <p>Date Of Birthday: {userAccount.date_of_birth}</p>
                    <p>Secret Token: {userAccount.token}</p>
                </div>

            </div>
        </>
    )

}