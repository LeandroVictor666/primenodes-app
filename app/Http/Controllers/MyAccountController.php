<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Models\Account;
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

    function changeUsername(Request $request, Account $accountModel)
    {
        session_start();

        $newUsername = $request['newUsername'];
        if (mb_strlen($newUsername) < 3) {
            $this->apiResponse([
                'response' => 'Invalid username, Min Length: 3',
                'isError' => 'true'
            ], 400);
        } else if (\mb_strlen($newUsername) > 35) {
            $this->apiResponse([
                'response' => 'Invalid username, Max Length: 35',
                'isError' => 'true'
            ], 400);
        };

        $usernameIsAlreadyTaken = $accountModel->where("username", "=", $newUsername)->first();
        if ($usernameIsAlreadyTaken !== null) {
            $this->apiResponse([
                'response' => 'This username is already taken. choose another',
                'isError' => 'true'
            ], 400);
        };

        $sessionKeyNames = SessionHelper::getSessionKeyNames();
        $userId = $_SESSION[$sessionKeyNames['AUTHENTICATION_ID']];
        $userAccount = $accountModel->find($userId);
        $userAccount->username = $newUsername;
        $userAccount->save();
        $this->apiResponse([
            'response' => 'Username changed sucessfully!',
            'isError' => 'false'
        ]);
        SessionHelper::removeSessionAuth();
        exit();
    }
}
