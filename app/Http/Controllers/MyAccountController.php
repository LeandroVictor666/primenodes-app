<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Http\Requests\UpdateAccountRequest;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyAccountController extends Controller
{

    public function __construct()
    {
        if (\session_status() !== PHP_SESSION_ACTIVE) {
            \session_start();
        }
    }

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

    function changeUsername(UpdateAccountRequest $request, Account $accountModel)
    {
        $newUsername = $request['newUsername'];
        $sessionKeyNames = SessionHelper::getSessionKeyNames();
        $actualUsername = $_SESSION[$sessionKeyNames['AUTHENTICATION_USERNAME']];
        if ($newUsername === $actualUsername) {
            $this->apiResponse([
                'response' => 'This is already your current username.',
                'isError' => 'true'
            ], 400);
            exit();
        }
        $usernameIsAlreadyTaken = $accountModel->where("username", "=", $newUsername)->first();
        if ($usernameIsAlreadyTaken !== null) {
            $this->apiResponse([
                'response' => 'This username is already taken. choose another',
                'isError' => 'true'
            ], 400);
            exit();
        };
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


    public function changeEmail(UpdateAccountRequest $request, Account $accountModel)
    {
        $newEmail = $request['newEmail'];
        $sessionKeyNames = SessionHelper::getSessionKeyNames();
        $actualEmail = $_SESSION[$sessionKeyNames['AUTHENTICATION_EMAIL']];
        if ($newEmail === $actualEmail) {
            $this->apiResponse([
                'response' => 'This is already your current E-mail.',
                'isError' => 'true'
            ], 400);
            exit();
        }
        $emailIsAlreadyTaken = $accountModel->where("email", "=", $newEmail)->first();
        if ($emailIsAlreadyTaken !== null) {
            $this->apiResponse([
                'response' => 'This E-mail is already taken. choose another',
                'isError' => 'true'
            ], 400);
            exit();
        };
        $userId = $_SESSION[$sessionKeyNames['AUTHENTICATION_ID']];
        $userAccount = $accountModel->find($userId);
        $userAccount->email = $newEmail;
        $userAccount->save();
        $this->apiResponse([
            'response' => 'E-mail changed sucessfully!',
            'isError' => 'false'
        ]);
        SessionHelper::removeSessionAuth();
        exit();
    }




}
