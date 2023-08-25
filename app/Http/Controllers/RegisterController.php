<?php
namespace App\Http\Controllers;


use App\Http\Requests\RegisterAccountRequest;
use App\Models\Account;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{

    public function store(Request $request)
    {
        return;
    }
    public function delete(Request $request)
    {
        return;
    }
    public function render()
    {
        $this->definePropBase('/Register');
        return Inertia::render('RegisterPage/RegisterPage', [
            'propBase' => $this->propBase,
        ]);
    }
    public function registerEvent(RegisterAccountRequest $request, Account $accountModel)
    {        
        try {
            $dataRequest = $request->all();
            $password = $dataRequest['password'];
            $passwordCrypt = password_hash($password, PASSWORD_DEFAULT);
            $dataRequest['password'] = $passwordCrypt;
            $accountModel = $accountModel->create($dataRequest);
            $serverToClient = ['response' => 'Registered', 'isError' => 'false'];
            $this->apiResponse($serverToClient);
            exit();
        } catch (QueryException $queryException) {
            $serverToClient = ['response' => 'Something went wrong with API.', 'isError' => 'true', 'mySqlError' => 0];
            $this->apiResponse($serverToClient, 400);
            exit();
        };
    }
}
