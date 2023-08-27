<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Requests\LoginAccountRequest;
use App\Http\Requests\RegisterAccountRequest;
use App\Http\Controllers\MyAccountController;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->post('/register', function (RegisterAccountRequest $request, Account $accountModel, RegisterController $registerController) {
    return $registerController->registerEvent($request, $accountModel);
});


Route::middleware('api')->post('/login', function (LoginAccountRequest $request, Account $accountModel, LoginController $loginController) {
    return $loginController->loginEvent($request, $accountModel);    
});

Route::middleware('api')->post('/logout', function (LoginController $loginController) {
    return $loginController->logout();
});

Route::middleware('api')->post('/updateUsername', function (MyAccountController $myAccountController, Request $request, Account $accountModel){
    return $myAccountController->changeUsername($request, $accountModel);
});