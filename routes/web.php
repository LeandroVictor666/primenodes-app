<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\MyAccountController;
use App\Http\Controllers\RegisterController;
use App\Models\Account;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MainPageController::class, 'render'])->name('main');
Route::get('/Register', [RegisterController::class, 'render'])->name('register');
Route::get('/Login', [LoginController::class, 'render'])->name('login');

/*
|--------------------------------------------------------------------------
| Web Authenticated Routes
|--------------------------------------------------------------------------
|
| Aqui fica as rotas que só podem ser acessadas através de autenticação.
|
*/
Route::group(['middleware' => 'primenodes.auth'], function () {
    Route::get("/MyAccount", [MyAccountController::class, 'render'])->name("myaccount");
});


require __DIR__ . '/auth.php';
