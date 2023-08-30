<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\MyAccountController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;
use App\Models\Account;
use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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
Route::get('/product/newproduct', [ProductController::class, 'newProductView'])->name('newproductpage');
Route::get("/product/searchproduct", [ProductController::class, 'searchProductView'])->name('searchproductpage');
Route::get("/product/{id}", function (int $id, ProductController $productController) {
    return $productController->viewFullProduct($id);
});


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
