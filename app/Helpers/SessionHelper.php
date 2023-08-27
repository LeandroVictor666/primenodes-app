<?php

namespace App\Helpers;

use Illuminate\Support\Arr;

class SessionHelper
{


    // public $AUTHENTICATION_KEY = 'AuthenticationToken';
    // public $AUTHENTICATION_USERNAME = 'AuthenticationUsername';
    // public $AUTHENTICATION_ID = 'AuthenticationID';
    // public $AUTHENTICATION_EMAIL = 'AuthenticationEmail';

    /**
     * Checa se o usuario esta logado fazendo checagens na super variavel $_SESSION, pois salvamos algumas informações lá
     * Pois a API não é persistente, então ao login ser disparado é automaticamente salvo as informações nessa variavel.
     * Pelo fato da aplicação ser monolita torna mais complicado para o Client enviar o Authorization Token
     * E até então, não achei muitas coisas de como colocar o JWT no Authorization dentro do Header.
     * Pensei em algumas formas, porém, essa aqui é a mais simples e direta.
     * Criando nosso proprio middleware + uma class que tenha a logica da autenticação.
     */
    public function checkAuthentication(): bool
    {
        session_start();
        $sessionKeys =  $this->getSessionKeyNames();

        if (!isset($_SESSION[$sessionKeys['AUTHENTICATION_ID']])){
            return false;
        }else if (!isset($_SESSION[$sessionKeys['AUTHENTICATION_USERNAME']])) {
            return false;
        }else if (!isset($_SESSION[$sessionKeys['AUTHENTICATION_FULLNAME']])){
            return false;
        }else if (!isset($_SESSION[$sessionKeys['AUTHENTICATION_EMAIL']])){
            return false;
        }else if (!isset($_SESSION[$sessionKeys['AUTHENTICATOIN_EMAILSTATUS']])){
            return false;
        }else if (!isset($_SESSION[$sessionKeys['AUTHENTICATION_BIRTHDAY']])){
            return false;
        }else if (!isset($_SESSION[$sessionKeys['AUTHENTICATION_TOKEN']])) {
            return false;
        }
        return true;
    }


    public static function getSessionKeyNames(): array|null
    {
        $sessionKeys = [
            'AUTHENTICATION_ID' => 'AuthenticationID',
            'AUTHENTICATION_USERNAME' => 'AuthenticationUsername',
            'AUTHENTICATION_FULLNAME' => 'AuthenticationFullname',
            'AUTHENTICATION_EMAIL' => 'AuthenticationEmail',
            'AUTHENTICATOIN_EMAILSTATUS' => 'AuthenticationEmailStatus',
            'AUTHENTICATION_BIRTHDAY' => 'AuthenticationBirthday',
            'AUTHENTICATION_TOKEN' => 'AuthenticationToken'
        ];
        return $sessionKeys;
    }
}
