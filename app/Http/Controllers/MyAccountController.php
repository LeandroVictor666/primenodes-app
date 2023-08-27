<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyAccountController extends Controller
{

    public function render(): \Inertia\Response
    {
        $accountInformations = $this->getAccountInformationBySession();
        return Inertia::render('MyAccount', [
            'AccountInformations' => $accountInformations
        ]);
    }




    public function getAccountInformationBySession(): array|null
    {
        $sessionKeyNames = SessionHelper::getSessionKeyNames();
        $id = $_SESSION[$sessionKeyNames['AUTHENTICATION_ID']];
        $username = $_SESSION[$sessionKeyNames['AUTHENTICATION_USERNAME']];
        $full_name = $_SESSION[$sessionKeyNames['AUTHENTICATION_FULLNAME']];
        $email = $_SESSION[$sessionKeyNames['AUTHENTICATION_EMAIL']];
        $email_status = $_SESSION[$sessionKeyNames['AUTHENTICATOIN_EMAILSTATUS']];
        $date_of_birth = $_SESSION[$sessionKeyNames['AUTHENTICATION_BIRTHDAY']];
        $token = $_SESSION[$sessionKeyNames['AUTHENTICATION_TOKEN']];

        $accountInformations = [
            'id' => $id,
            'username' => $username,
            'full_name' => $full_name,
            'email' => $email,
            'email_status' => $email_status,
            'date_of_birth' => $date_of_birth,
            'token' => $token
        ];

        return $accountInformations;
    }
}
