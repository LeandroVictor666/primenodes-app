<?php

use App\Http\Controllers\RegisterController;
use App\Http\Requests\RegisterAccountRequest;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::middleware('api')->post('/register', function (RegisterAccountRequest $request, Account $accountModel, RegisterController $registerController) {
    return $registerController->registerEvent($request, $accountModel);
});



// Route::middleware('api')->post('/registeruser', function (RegisterAccountRequest $request, AccountController $accountController, Account $accountModel) {
//     return $accountController->registerNewUser($request, $accountModel);
// });

// Route::middleware('api')->post('/authenticate/login', function (Request $request, AuthenticationController $authenticationController, Account $accountModel) {
//     return  $authenticationController->authenticateLogin($request, $accountModel);
// });

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::get("/myInformations", [AccountController::class, 'getInformations']);
// });
