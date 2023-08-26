<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAccountRequest;
use App\Models\Account;
use Inertia\Inertia;
class LoginController extends Controller
{


    public function render()
    {
        return Inertia::render('LoginPage/Login', []);
    }

    public function loginEvent(LoginAccountRequest $request, Account $accountModel)
    {
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
        exit();
    }
}
