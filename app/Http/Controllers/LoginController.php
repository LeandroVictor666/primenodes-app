<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Http\Requests\LoginAccountRequest;
use App\Models\Account;
use Inertia\Inertia;

class LoginController extends Controller
{


    public function render()
    {
        return Inertia::render('AuthenticatedPages/MyAccount', []);
    }

    public function loginEvent(LoginAccountRequest $request, Account $accountModel)
    {
        session_start();;
        $password = $request['password'];
        $queryResult = $accountModel->where("username", '=', $request['username'])->first();

        if ($queryResult == null) {
            $this->apiResponse([
                'response' => 'Login Failure, invalid credentials',
                'isError' => 'true',
                'token' => '0'
            ]);
            exit();
        }
        if (!password_verify($password, $queryResult['password'])) {
            $this->apiResponse([
                'response' => 'Login Failure, invalid credentials',
                'isError' => 'true',
                'token' => '0'
            ]);
            exit();
        };
        $deviceName = "{\"username\" : \"{$request['username']}\",  \"device_name\" : \"{$request['device_name']}\"}";
        $token = $queryResult->createToken($deviceName)->plainTextToken;
        $this->apiResponse([
            'response' => 'Login Sucessfull',
            'isError' => 'false',
            'full_name' => $queryResult->full_name,
            'email' => $queryResult->email,
            'token' => $token
        ], 200);

        $sessionKeyNames = SessionHelper::getSessionKeyNames();
        $_SESSION[$sessionKeyNames['AUTHENTICATION_ID']] = $queryResult->id;
        $_SESSION[$sessionKeyNames['AUTHENTICATION_USERNAME']] = $queryResult->username;
        $_SESSION[$sessionKeyNames['AUTHENTICATION_FULLNAME']] = $queryResult->full_name;
        $_SESSION[$sessionKeyNames['AUTHENTICATION_EMAIL']] = $queryResult->email;
        $_SESSION[$sessionKeyNames['AUTHENTICATOIN_EMAILSTATUS']] = $queryResult->email_status;
        $_SESSION[$sessionKeyNames['AUTHENTICATION_BIRTHDAY']] = $queryResult->date_of_birth;
        $_SESSION[$sessionKeyNames['AUTHENTICATION_TOKEN']] = $token;

        exit();
    }

    public function logout()
    {
        if (!SessionHelper::checkAuthentication()) {
            return \redirect('/', 200);
            exit();
        };

        if (!SessionHelper::removeSessionAuth()) {
            $this->apiResponse([
                'response' => 'logout failed',
                'isError' => 'true'
            ], 400);
            exit();
        };
        $this->apiResponse([
            'response' => 'logout sucess',
            'isError' => 'false'
        ], 200);
        exit();
        
    }
}
