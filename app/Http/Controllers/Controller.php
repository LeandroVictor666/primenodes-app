<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Notifications\Notifiable;
use Illuminate\Routing\Controller as BaseController;
use Laravel\Sanctum\HasApiTokens;

class Controller extends BaseController
{
    /**
     * Array with props.
     */
    protected $propBase;

    /**
     * Apply common props.
     */
    protected function definePropBase(string $Route = '/'): void
    {
        $this->propBase = array(
            'Route' => $Route
        );
    }

    protected function apiResponse(array $content, int $code = 200): void
    {
        header("Content-Type: application/json");
        http_response_code($code);
        echo json_encode($content);
        return;
    }

    protected function customIsAuth() :bool
    {
        if (\session_status() !== PHP_SESSION_ACTIVE) {
            \session_start();
        }
        if (!SessionHelper::checkAuthentication()) {
            return false;
        }

        

        return true;
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


    use AuthorizesRequests, ValidatesRequests;
}
